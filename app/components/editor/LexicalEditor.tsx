import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';

import { ImageNode } from './nodes/ImageNode';
import { CalloutNode } from './nodes/CalloutNode';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { HTMLSyncPlugin } from './plugins/HTMLSyncPlugin';
import { FloatingLinkEditorPlugin } from './plugins/FloatingLinkEditorPlugin';

const theme = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
  heading: {
    h2: 'text-3xl font-black mt-9 mb-3',
    h3: 'text-2xl font-bold mt-7 mb-3',
  },
  quote: 'my-6 border-l-4 border-accent bg-slate-50 px-5 py-4 italic',
  list: {
    ul: 'list-disc mb-5 pl-5',
    ol: 'list-decimal mb-5 pl-5',
    listitem: 'mb-2',
  },
  link: 'font-semibold text-accent underline',
  paragraph: 'mb-4',
  table: 'w-full border-collapse my-6 border border-border',
  tableCell: 'border border-border px-4 py-3 align-top relative',
  tableCellHeader: 'bg-[#F2F9FF] font-semibold text-[#19233D] text-left border border-border px-4 py-3 relative',
};

export function LexicalEditor({
  value,
  onChange,
  imageUploadTitle,
}: {
  value: string;
  onChange: (value: string) => void;
  imageUploadTitle?: string;
}) {
  const initialConfig = {
    namespace: 'NomyxEditor',
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
      CalloutNode,
      TableNode,
      TableCellNode,
      TableRowNode,
    ],
  };

  return (
    <div className="rounded-[8px] border border-border bg-white shadow-[0_18px_54px_rgba(10,17,40,0.07)] relative">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin imageUploadTitle={imageUploadTitle} />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[520px] bg-white px-6 py-6 text-[17px] leading-8 text-ink outline-none [&_.blog-callout-list]:my-3 [&_.blog-callout-list]:rounded-[12px] [&_.blog-callout-list]:border [&_.blog-callout-list]:border-accent/15 [&_.blog-callout-list]:bg-[#F2F9FF] [&_.blog-callout-list]:px-4 [&_.blog-callout-list]:py-3 [&_.blog-callout-list]:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] [&_.blog-callout-list_li]:mb-2 [&_.blog-callout-list_li]:ml-5 [&_.blog-callout-list_li]:list-disc [&_.blog-callout-list_li]:font-semibold [&_.blog-callout-list_li]:text-ink [&_.blog-callout-list_ul]:mb-0" />
            }
            placeholder={<div className="absolute top-6 left-6 text-ink/40 pointer-events-none text-[17px]">Start writing...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin />
          <FloatingLinkEditorPlugin />
          <HTMLSyncPlugin value={value} onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}
