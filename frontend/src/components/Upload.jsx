import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import API from "../services/api";

export default function Upload({ user, setUser }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const feature = searchParams.get("feature") || "upload";

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  // Feature states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingFeature, setLoadingFeature] = useState(false);
  const [summary, setSummary] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const getAuthToken = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData?.session?.access_token;
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const token = await getAuthToken();

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      setUploadResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail || err.response?.data?.error || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // Feature handlers
  const handleAsk = async () => {
    if (!question.trim() || !uploadResult) return;
    setLoadingFeature(true);
    try {
      const response = await API.post("/ask", {
        question,
        user_id: uploadResult.user_id,
        doc_id: uploadResult.doc_id,
      });
      setAnswer(response.data.answer);
    } catch (err) {
      setAnswer("Failed to get answer. Please try again.");
    } finally {
      setLoadingFeature(false);
    }
  };

  const handleSummarize = async () => {
    if (!uploadResult) return;
    setLoadingFeature(true);
    try {
      const response = await API.post("/summarize", {
        text: uploadResult.preview,
      });
      setSummary(response.data.summary);
    } catch (err) {
      setSummary("Failed to generate summary. Please try again.");
    } finally {
      setLoadingFeature(false);
    }
  };

  const handleIdeas = async () => {
    if (!uploadResult) return;
    setLoadingFeature(true);
    try {
      const response = await API.post("/ideas", {
        text: uploadResult.preview,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setIdeas(data);
      } else if (data.ideas) {
        setIdeas(data.ideas);
      } else {
        setIdeas([data]);
      }
    } catch (err) {
      setIdeas(["Failed to generate ideas. Please try again."]);
    } finally {
      setLoadingFeature(false);
    }
  };

  const handleRecommend = async () => {
    if (!uploadResult) return;
    setLoadingFeature(true);
    try {
      const token = await getAuthToken();
      const response = await API.post(
        "/recommend",
        { query: uploadResult.preview },
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setRecommendations(["Failed to get recommendations. Please try again."]);
    } finally {
      setLoadingFeature(false);
    }
  };

  const setFeature = (f) => {
    setSearchParams({ feature: f });
  };

  // Features no longer auto-trigger on upload — user clicks the button to run them

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!uploadResult && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed border-babyblue/30 rounded-2xl p-10 text-center hover:border-babyblue/60 transition-colors duration-300 bg-deepnavy/50 cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer block">
            <div className="text-5xl mb-4">📄</div>
            <p className="text-babyblue font-medium text-lg mb-2">
              {file ? file.name : "Drop your PDF here or click to browse"}
            </p>
            <p className="text-periwinkle/60 text-sm">
              {file ? "Click to change file" : "Supports PDF files"}
            </p>
          </label>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {file && !uploadResult && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading & Indexing..." : "Upload & Index PDF"}
        </button>
      )}

      {uploadResult && (
        <div className="bg-deepnavy-light border border-babyblue/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 text-green-400">
            <span className="text-xl">✅</span>
            <span className="font-medium">Uploaded & Indexed Successfully</span>
          </div>

          <div className="bg-deepnavy/50 rounded-xl p-4 border border-babyblue/10">
            <h4 className="text-babyblue font-medium mb-2">Document Preview</h4>
            <p className="text-periwinkle/80 text-sm leading-relaxed max-h-48 overflow-y-auto">
              {uploadResult.preview}
            </p>
          </div>

          {/* Feature Tabs - only shown when no specific feature is pre-selected */}
          {feature === "upload" && (
            <div className="flex gap-2 flex-wrap">
              {["ask", "summary", "recommend", "ideas"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFeature(f)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-deepnavy/50 text-periwinkle/60 hover:text-babyblue hover:bg-deepnavy"
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Feature Content */}
          {feature === "ask" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                  placeholder="Ask anything about your paper..."
                  className="flex-1 bg-deepnavy/50 border border-babyblue/20 rounded-xl px-4 py-3 text-babyblue placeholder-periwinkle/40 focus:outline-none focus:border-sapphire"
                />
                <button
                  onClick={handleAsk}
                  disabled={loadingFeature}
                  className="btn disabled:opacity-50"
                >
                  {loadingFeature ? "Thinking..." : "Ask"}
                </button>
              </div>
              {answer && (
                <div className="bg-deepnavy/50 rounded-xl p-4 border border-babyblue/10">
                  <p className="text-periwinkle/80 leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          )}

          {feature === "summary" && (
            <div className="space-y-4">
              <button
                onClick={handleSummarize}
                disabled={loadingFeature}
                className="btn disabled:opacity-50"
              >
                {loadingFeature ? "Generating..." : "Regenerate Summary"}
              </button>
              {summary && (
                <div className="bg-deepnavy/50 rounded-xl p-4 border border-babyblue/10">
                  <p className="text-periwinkle/80 leading-relaxed">{summary}</p>
                </div>
              )}
            </div>
          )}

          {feature === "recommend" && (
            <div className="space-y-4">
              <button
                onClick={handleRecommend}
                disabled={loadingFeature}
                className="btn disabled:opacity-50"
              >
                {loadingFeature ? "Finding..." : "Get Recommendations"}
              </button>
              {recommendations.length > 0 && (
                <ul className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="bg-deepnavy/50 rounded-xl p-4 border border-babyblue/10 text-periwinkle/80"
                    >
                      {rec}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {feature === "ideas" && (
            <div className="space-y-4">
              <button
                onClick={handleIdeas}
                disabled={loadingFeature}
                className="btn disabled:opacity-50"
              >
                {loadingFeature ? "Generating..." : "Generate Ideas"}
              </button>
              {ideas.length > 0 && (
                <ul className="space-y-2">
                  {ideas.map((idea, i) => (
                    <li
                      key={i}
                      className="bg-deepnavy/50 rounded-xl p-4 border border-babyblue/10 text-periwinkle/80"
                    >
                      {typeof idea === "string"
                        ? idea
                        : idea.title || JSON.stringify(idea)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

