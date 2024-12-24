declare module "react-quill" {
  import { ComponentType } from "react";

  export interface QuillOptions {
    debug?: string | boolean;
    formats?: string[];
    modules?: {
      [key: string]: unknown;
      toolbar?: {
        container?: string | string[] | { [key: string]: string[] }[];
        handlers?: { [key: string]: (value: string) => void };
      };
    };
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    bounds?: string | HTMLElement;
    scrollingContainer?: string | HTMLElement;
  }

  export interface ReactQuillProps {
    bounds?: string | HTMLElement;
    children?: unknown;
    className?: string;
    defaultValue?: string;
    formats?: string[];
    id?: string;
    modules?: { [key: string]: unknown };
    onChange?: (
      content: string,
      delta: unknown,
      source: string,
      editor: UnprivilegedEditor,
    ) => void;
    onChangeSelection?: (
      range: Range | null,
      source: string,
      editor: UnprivilegedEditor,
    ) => void;
    onFocus?: (
      range: Range | null,
      source: string,
      editor: UnprivilegedEditor,
    ) => void;
    onBlur?: (
      previousRange: Range | null,
      source: string,
      editor: UnprivilegedEditor,
    ) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    placeholder?: string;
    preserveWhitespace?: boolean;
    readOnly?: boolean;
    scrollingContainer?: string | HTMLElement;
    style?: React.CSSProperties;
    tabIndex?: number;
    theme?: string;
    value?: string;
  }

  export interface Range {
    index: number;
    length: number;
  }

  export interface UnprivilegedEditor {
    getLength(): number;
    getText(index?: number, length?: number): string;
    getHTML(): string;
    getBounds(index: number, length?: number): unknown;
    getSelection(focus?: boolean): Range | null;
    getContents(index?: number, length?: number): unknown;
  }

  export interface QuillInstance extends UnprivilegedEditor {
    deleteText(index: number, length: number, source?: string): void;
    disable(): void;
    enable(enabled?: boolean): void;
    insertEmbed(index: number, type: string, value: unknown): void;
    insertText(index: number, text: string, source?: string): void;
    setContents(delta: unknown, source?: string): void;
    setText(text: string, source?: string): void;
    update(source?: string): void;
    updateContents(delta: unknown, source?: string): void;
  }

  const Quill: ComponentType<ReactQuillProps> & {
    Quill: QuillInstance;
  };

  export default Quill;
}
