import React, { useState } from 'react';
import { RefreshCw, Trash2, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * BlogAdminTools Component
 * 
 * Provides admin utilities for blog management:
 * - Regenerate all published blogs
 * - View list of generated blog files
 * - Clear all generated blog files
 * 
 * Usage: Add to admin dashboard or separate admin tools page
 */

interface BlogFile {
    file: string;
    slug: string;
    size: number;
    modified: string;
}

interface ListResponse {
    success: boolean;
    total: number;
    files: BlogFile[];
}

const BlogAdminTools: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [blogFiles, setBlogFiles] = useState<BlogFile[]>([]);
    const [showFileList, setShowFileList] = useState(false);

    // Regenerate all published blogs
    const handleRegenerateAll = async () => {
        if (!window.confirm(
            'This will regenerate HTML files for ALL published blogs and update configuration files. Continue?'
        )) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/backend/api/blog-admin.php?action=regenerate-all', {
                method: 'POST'
            });
            const data = await response.json();

            if (data.success) {
                toast.success(`✅ Generated ${data.generated} blog HTML files and updated configs!`);
                loadBlogFiles();
            } else {
                toast.error(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            toast.error('Failed to regenerate blogs');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Load list of generated blog files
    const loadBlogFiles = async () => {
        try {
            const response = await fetch('/backend/api/blog-admin.php?action=list');
            const data: ListResponse = await response.json();

            if (data.success) {
                setBlogFiles(data.files);
                setShowFileList(true);
                toast.info(`Found ${data.total} generated blog files`);
            } else {
                toast.error('Failed to load blog files');
            }
        } catch (error) {
            toast.error('Failed to load blog files');
            console.error(error);
        }
    };

    // Clear all generated blog files
    const handleClearAll = async () => {
        if (
            !window.confirm(
                '⚠️ WARNING: This will DELETE all generated blog HTML files. They can be regenerated. Continue?'
            )
        ) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/backend/api/blog-admin.php?action=clear', {
                method: 'POST'
            });
            const data = await response.json();

            if (data.success) {
                toast.warning(`🗑️ Deleted ${data.deleted} blog HTML files`);
                setBlogFiles([]);
                setShowFileList(false);
            } else {
                toast.error(`Error: ${data.error}`);
            }
        } catch (error) {
            toast.error('Failed to clear blog files');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">📚 Blog Management Tools</h2>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Regenerate All */}
                <button
                    onClick={handleRegenerateAll}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                    <RefreshCw size={20} />
                    Regenerate All
                </button>

                {/* View Generated Files */}
                <button
                    onClick={loadBlogFiles}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                    <FileText size={20} />
                    View Files
                </button>

                {/* Clear All */}
                <button
                    onClick={handleClearAll}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                    <Trash2 size={20} />
                    Clear All
                </button>
            </div>

            {/* Status Message */}
            {loading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800">⏳ Processing... Please wait.</p>
                </div>
            )}

            {/* Blog Files List */}
            {showFileList && blogFiles.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Generated Blog Files ({blogFiles.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">File Name</th>
                                    <th className="px-4 py-2 text-left">Slug</th>
                                    <th className="px-4 py-2 text-right">Size</th>
                                    <th className="px-4 py-2 text-left">Last Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogFiles.map((file, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 font-mono text-blue-600">{file.file}</td>
                                        <td className="px-4 py-2">/{file.slug}</td>
                                        <td className="px-4 py-2 text-right">{(file.size / 1024).toFixed(2)} KB</td>
                                        <td className="px-4 py-2">{file.modified}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💡 How it works:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Regenerate All:</strong> Scans all published blogs and generates HTML files with SEO meta tags</li>
                    <li>• <strong>View Files:</strong> Lists all generated blog HTML files and their sizes</li>
                    <li>• <strong>Clear All:</strong> Deletes all generated blog files (they can be regenerated anytime)</li>
                    <li>• Files are automatically generated when you publish a blog from the blog editor</li>
                    <li>• Configuration files (vite.config.ts, .htaccess) are automatically updated</li>
                </ul>
            </div>
        </div>
    );
};

export default BlogAdminTools;
