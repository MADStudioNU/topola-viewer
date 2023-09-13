import ReactMarkdown from 'react-markdown';
import React from 'react';
import remarkGfm from 'remark-gfm';

interface Props {
  lines: (React.ReactElement | string)[];
}

export function MultilineText(props: Props) {
  type AllowArray<T> = T | T[];

  // Getting the text from a node to feed to ReactMarkdown is a bit tricky.
  const getNodeText = (node: AllowArray<React.ReactNode>): string => {
    if (['string', 'number'].includes(typeof node))
      return node as unknown as string;
    if (node instanceof Array) return node.map(getNodeText).join('');
    if (typeof node === 'object' && (node as any).props?.children)
      return getNodeText((node as any).props?.children);
    if (typeof node === 'boolean') return '';
    if (node) console.warn('Unresolved node of type:', typeof node, node);
    return '';
  };

  return (
    <>
      {props.lines.map((line, index) => (
        <div className="note-paragraph" key={index}>
          <ReactMarkdown children={getNodeText(line)} />
        </div>
      ))}
    </>
  );
}
