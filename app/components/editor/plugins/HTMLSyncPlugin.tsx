import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useEffect, useRef } from 'react';
import { $getRoot, $createParagraphNode, $isElementNode, $isDecoratorNode } from 'lexical';

export function HTMLSyncPlugin({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && value) {
      isFirstRender.current = false;
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        
        const topLevelNodes = [];
        let currentParagraph = null;
        
        for (const node of nodes) {
          if (node.getType() !== 'text' && ($isElementNode(node) || $isDecoratorNode(node))) {
            topLevelNodes.push(node);
            currentParagraph = null;
          } else {
            if (!currentParagraph) {
              currentParagraph = $createParagraphNode();
              topLevelNodes.push(currentParagraph);
            }
            currentParagraph.append(node);
          }
        }
        
        if (topLevelNodes.length === 0) {
          topLevelNodes.push($createParagraphNode());
        }
        
        root.append(...topLevelNodes);
      });
    }
  }, [editor, value]);

  useEffect(() => {
    return editor.registerUpdateListener(({ dirtyElements, dirtyLeaves }) => {
      if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

      editor.read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        setTimeout(() => onChange(html), 0);
      });
    });
  }, [editor, onChange]);

  return null;
}
