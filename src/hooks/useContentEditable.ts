import { useCallback, useState } from "react";

interface ContentEditableOptions {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export function useContentEditable({
  value,
  onChange,
  maxLength,
}: ContentEditableOptions) {
  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const content = value;

  const handleInput = useCallback(() => {
    if (!contentRef) return;

    const newContent = contentRef.innerHTML;
    const textLength = contentRef.textContent?.length ?? 0;
    if (maxLength && textLength > maxLength) {
      // Restore previous content if over limit
      contentRef.innerHTML = content;
      return;
    }

    onChange(newContent);
  }, [content, maxLength, onChange, contentRef]);

  const insertText = useCallback(
    (text: string, caretPosition?: number) => {
      if (!contentRef) return;

      contentRef.innerHTML = text;
      onChange(text);

      if (typeof caretPosition === "number") {
        // Set caret position
        const selection = window.getSelection();
        const range = document.createRange();

        const currentNode = contentRef;
        let currentPos = 0;

        // Find the text node and position
        const findPosition = (node: Node): boolean => {
          if (node.nodeType === Node.TEXT_NODE) {
            const length = node.textContent?.length || 0;
            if (currentPos + length >= caretPosition) {
              range.setStart(node, caretPosition - currentPos);
              range.setEnd(node, caretPosition - currentPos);
              return true;
            }
            currentPos += length;
          } else {
            for (const child of Array.from(node.childNodes)) {
              if (findPosition(child)) return true;
            }
          }
          return false;
        };

        findPosition(currentNode);

        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    },
    [onChange, contentRef],
  );

  const getCaretPosition = useCallback((): number | null => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const currentNode = contentRef;
    let position = 0;

    if (!currentNode) return null;

    // Calculate position by traversing nodes
    const calculatePosition = (node: Node): boolean => {
      if (node === range.startContainer) {
        position += range.startOffset;
        return true;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        position += node.textContent?.length || 0;
      } else {
        for (const child of Array.from(node.childNodes)) {
          if (calculatePosition(child)) return true;
        }
      }
      return false;
    };

    calculatePosition(currentNode);
    return position;
  }, [contentRef]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (maxLength && contentRef) {
        const textLength = contentRef.textContent?.length ?? 0;
        // Allow deletion keys
        if (e.key === "Backspace" || e.key === "Delete") return;
        // Allow navigation keys
        if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End")
          return;
        // Allow modifier keys
        if (e.ctrlKey || e.metaKey) return;
        // Block input if at max length
        if (textLength >= maxLength && e.key.length === 1) {
          e.preventDefault();
        }
      }
    },
    [maxLength, contentRef],
  );

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    setContentRef(node);
  }, []);

  return {
    ref: refCallback,
    content,
    handleInput,
    handleKeyDown,
    insertText,
    getCaretPosition,
  };
}
