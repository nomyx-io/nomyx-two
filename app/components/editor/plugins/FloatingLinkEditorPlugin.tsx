import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_LOW, $getNodeByKey } from 'lexical';
import { $isLinkNode } from '@lexical/link';
import { useCallback, useEffect, useState, useRef } from 'react';
import { mergeRegister } from '@lexical/utils';
import { createPortal } from 'react-dom';

export function FloatingLinkEditorPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeLinkKey, setActiveLinkKey] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTarget, setLinkTarget] = useState(false);
  const [linkNoFollow, setLinkNoFollow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      const linkNode = $isLinkNode(parent) ? parent : $isLinkNode(node) ? node : null;
      
      if (linkNode) {
        setActiveLinkKey(linkNode.getKey());
        setLinkUrl(linkNode.getURL());
        setLinkTarget(linkNode.getTarget() === '_blank');
        setLinkNoFollow(linkNode.getRel() === 'nofollow');

        const linkDOM = editor.getElementByKey(linkNode.getKey());
        if (linkDOM) {
          const rect = linkDOM.getBoundingClientRect();
          setPosition({
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX,
          });
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeLinkKey && editorRef.current && !editorRef.current.contains(e.target as Node)) {
        const isEditorElement = editor.getRootElement()?.contains(e.target as Node);
        if (!isEditorElement) {
          setActiveLinkKey(null);
        } else {
          setTimeout(() => {
            editor.getEditorState().read(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const node = selection.anchor.getNode();
                const parent = node.getParent();
                const linkNode = $isLinkNode(parent) ? parent : $isLinkNode(node) ? node : null;
                if (!linkNode) {
                  setActiveLinkKey(null);
                }
              } else {
                setActiveLinkKey(null);
              }
            });
          }, 0);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeLinkKey, editor]);

  const updateLink = (url: string, target: boolean, rel: boolean) => {
    editor.update(() => {
      if (!activeLinkKey) return;
      const node = $getNodeByKey(activeLinkKey);
      if ($isLinkNode(node)) {
        node.setURL(url);
        node.setTarget(target ? '_blank' : null);
        node.setRel(rel ? 'nofollow' : null);
      }
    });
  };

  if (!activeLinkKey) return null;

  return createPortal(
    <div 
      ref={editorRef}
      className="absolute z-50 bg-white border border-border shadow-lg rounded-xl p-4 flex flex-col gap-3 w-80"
      style={{ top: position.top, left: position.left }}
    >
      <input
        type="url"
        value={linkUrl}
        onChange={(e) => {
          setLinkUrl(e.target.value);
          updateLink(e.target.value, linkTarget, linkNoFollow);
        }}
        className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
        placeholder="https://"
      />
      <div className="flex justify-between items-end gap-2">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
            <input 
              type="checkbox" 
              checked={linkTarget} 
              onChange={(e) => {
                setLinkTarget(e.target.checked);
                updateLink(linkUrl, e.target.checked, linkNoFollow);
              }} 
            />
            Open in new tab
          </label>
          <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
            <input 
              type="checkbox" 
              checked={linkNoFollow} 
              onChange={(e) => {
                setLinkNoFollow(e.target.checked);
                updateLink(linkUrl, linkTarget, e.target.checked);
              }} 
            />
            No-follow
          </label>
        </div>
        <button
          onClick={() => setActiveLinkKey(null)}
          className="bg-accent text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
}
