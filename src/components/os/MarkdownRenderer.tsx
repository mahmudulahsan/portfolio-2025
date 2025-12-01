import React from "react";

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
    const renderMarkdown = (text: string) => {
        const lines = text.split("\n");
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeBlockContent: string[] = [];
        let listItems: string[] = [];
        let inList = false;

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`list-${elements.length}`} className="list-disc list-inside my-1 space-y-0.5 ml-2">
                        {listItems.map((item, idx) => (
                            <li key={idx} className="text-xs">{parseInlineMarkdown(item)}</li>
                        ))}
                    </ul>
                );
                listItems = [];
                inList = false;
            }
        };

        lines.forEach((line, idx) => {
            // Code block detection
            if (line.trim().startsWith("```")) {
                if (inCodeBlock) {
                    // End code block
                    elements.push(
                        <pre key={`code-${idx}`} className="bg-gray-100 border border-gray-300 p-2 rounded my-1 overflow-x-auto text-[10px]">
                            <code>{codeBlockContent.join("\n")}</code>
                        </pre>
                    );
                    codeBlockContent = [];
                    inCodeBlock = false;
                } else {
                    // Start code block
                    flushList();
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                return;
            }

            // List items
            if (line.trim().match(/^[-*]\s+/)) {
                const listContent = line.trim().replace(/^[-*]\s+/, "");
                listItems.push(listContent);
                inList = true;
                return;
            } else if (inList && line.trim() === "") {
                flushList();
                return;
            } else if (inList) {
                flushList();
            }

            // Headers
            if (line.startsWith("### ")) {
                elements.push(
                    <h3 key={idx} className="font-bold text-xs mt-2 mb-1">
                        {parseInlineMarkdown(line.replace("### ", ""))}
                    </h3>
                );
                return;
            }

            if (line.startsWith("## ")) {
                elements.push(
                    <h2 key={idx} className="font-bold text-sm mt-2 mb-1">
                        {parseInlineMarkdown(line.replace("## ", ""))}
                    </h2>
                );
                return;
            }

            if (line.startsWith("# ")) {
                elements.push(
                    <h1 key={idx} className="font-bold text-base mt-2 mb-1">
                        {parseInlineMarkdown(line.replace("# ", ""))}
                    </h1>
                );
                return;
            }

            // Inline code
            if (line.trim() === "") {
                elements.push(<br key={idx} />);
                return;
            }

            // Regular paragraph
            elements.push(
                <p key={idx} className="text-xs my-0.5">
                    {parseInlineMarkdown(line)}
                </p>
            );
        });

        // Flush any remaining list
        flushList();

        return elements;
    };

    const parseInlineMarkdown = (text: string): React.ReactNode => {
        const parts: React.ReactNode[] = [];
        const currentText = text;
        let key = 0;

        // Process inline code first
        const codeRegex = /`([^`]+)`/g;
        let lastIndex = 0;
        let match;

        while ((match = codeRegex.exec(text)) !== null) {
            // Add text before code
            if (match.index > lastIndex) {
                const beforeText = text.substring(lastIndex, match.index);
                parts.push(...processTextFormatting(beforeText, key++));
            }
            // Add code
            parts.push(
                <code key={`code-${key++}`} className="bg-gray-200 px-1 rounded text-[10px] font-mono">
                    {match[1]}
                </code>
            );
            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            parts.push(...processTextFormatting(remainingText, key++));
        }

        return parts.length > 0 ? parts : text;
    };

    const processTextFormatting = (text: string, startKey: number): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        const remaining = text;
        let key = startKey;

        // Bold
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                const beforeText = text.substring(lastIndex, match.index);
                parts.push(...processItalic(beforeText, key++));
            }
            parts.push(
                <strong key={`bold-${key++}`} className="font-bold">
                    {match[1]}
                </strong>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            parts.push(...processItalic(remainingText, key++));
        }

        return parts.length > 0 ? parts : [text];
    };

    const processItalic = (text: string, startKey: number): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        const italicRegex = /\*([^*]+)\*/g;
        let lastIndex = 0;
        let match;
        let key = startKey;

        while ((match = italicRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <em key={`italic-${key++}`} className="italic">
                    {match[1]}
                </em>
            );
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : [text];
    };

    return <div className={className}>{renderMarkdown(content)}</div>;
}
