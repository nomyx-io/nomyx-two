import { DOMConversionMap, DOMConversionOutput, DOMExportOutput, ElementNode, LexicalNode, NodeKey, SerializedElementNode, Spread } from 'lexical';

export type SerializedCalloutNode = Spread<
  {
    type: 'callout';
    version: 1;
  },
  SerializedElementNode
>;

function convertCalloutElement(domNode: HTMLElement): DOMConversionOutput | null {
  const node = $createCalloutNode();
  return { node };
}

export class CalloutNode extends ElementNode {
  static getType(): string {
    return 'callout';
  }

  static clone(node: CalloutNode): CalloutNode {
    return new CalloutNode(node.__key);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(config: any): HTMLElement {
    const dom = document.createElement('div');
    dom.className = 'blog-callout-list';
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div');
    element.className = 'blog-callout-list';
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      div: (domNode: HTMLElement) => {
        if (!domNode.className.includes('blog-callout-list')) {
          return null;
        }
        return {
          conversion: convertCalloutElement,
          priority: 2,
        };
      },
    };
  }

  static importJSON(serializedNode: SerializedCalloutNode): CalloutNode {
    return $createCalloutNode();
  }

  exportJSON(): SerializedCalloutNode {
    return {
      ...super.exportJSON(),
      type: 'callout',
      version: 1,
    };
  }
}

export function $createCalloutNode(): CalloutNode {
  return new CalloutNode();
}

export function $isCalloutNode(
  node: LexicalNode | null | undefined,
): node is CalloutNode {
  return node instanceof CalloutNode;
}
