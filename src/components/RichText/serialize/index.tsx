import type { SerializedListItemNode, SerializedListNode } from '@lexical/list';
import type { SerializedHeadingNode } from '@lexical/rich-text';
import type { LinkFields, SerializedLinkNode } from '@payloadcms/richtext-lexical';
import escapeHTML from 'escape-html';
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from 'lexical';
import Link from 'next/link';
import React, { Fragment } from 'react';

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat';

import { Media } from '@/components/Media';
import { CodeBlock } from '@/components/RichText/CodeBlock';
import { Media as MediaType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { toKebabCase } from '@/utils/toKebabCase';

interface Props {
  nodes: SerializedLexicalNode[];
}

export function serializeLexical({ nodes }: Props) {
  return (
    <Fragment>
      {nodes?.map((_node, index) => {
        const node = _node as SerializedTextNode;
        const format = ['left', 'right', 'center', 'justify'].includes(String(node.format))
          ? 'text-' + String(node.format)
          : undefined;

        if (_node.type === 'text') {
          let text = (
            <span
              dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
              key={index}
              className={format}
            />
          );
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        const serializedChildrenFn = (node: SerializedElementNode) => {
          if (node.children == null) {
            return null;
          } else {
            if (node?.type === 'list' && (node as SerializedListNode)?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return serializeLexical({ nodes: node.children });
            } else {
              return serializeLexical({ nodes: node.children });
            }
          }
        };

        const serializedChildren =
          'children' in _node ? serializedChildrenFn(_node as SerializedElementNode) : '';

        switch (_node.type) {
          case 'linebreak': {
            return <br key={index} />;
          }
          case 'paragraph': {
            return (
              <p key={index} className={format}>
                {serializedChildren}
              </p>
            );
          }
          case 'heading': {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;
            const Tag = node?.tag as Heading;

            return (
              <Tag
                key={index}
                className={format}
                id={toKebabCase(
                  String((node.children[0] as unknown as { text: string }).text ?? ''),
                )}
              >
                {serializedChildren}
              </Tag>
            );
          }
          case 'label':
            return (
              <p className={format} key={index}>
                {serializedChildren}
              </p>
            );

          case 'list': {
            const node = _node as SerializedListNode;

            type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>;
            const Tag = node?.tag as List;
            return (
              <Tag className={cn(node?.listType, format)} key={index}>
                {serializedChildren}
              </Tag>
            );
          }
          case 'listitem': {
            const node = _node as SerializedListItemNode;

            return (
              <li className={format} key={index} value={node?.value}>
                {serializedChildren}
              </li>
            );
          }
          case 'quote': {
            return (
              <blockquote key={index} className={format}>
                {serializedChildren}
              </blockquote>
            );
          }
          case 'link': {
            const node = _node as SerializedLinkNode;

            const fields: LinkFields = node.fields;
            const rel = fields.disableIndex ? 'noopener noreferrer' : undefined;
            const doc = fields.doc?.value ?? {};
            let slug = 'slug' in doc ? doc.slug : null;
            if (slug === 'home') {
              slug = '';
            }

            const href = slug || slug === '' ? '/' + slug : escapeHTML(fields.url);

            return (
              <Link
                href={href}
                key={index}
                rel={rel}
                target={fields.newTab ? '_blank' : undefined}
                className={format}
              >
                {serializedChildren}
              </Link>
            );
          }

          case 'horizontalrule': {
            return <hr key={index} />;
          }

          case 'upload': {
            const source = (node as unknown as { value: MediaType }).value;

            return (
              <Media
                source={source}
                className="mx-auto"
                sizes="(max-width: 1440px) calc(100vw - 32px), 1408px"
              />
            );
          }

          case 'code': {
            const codeNode = node as unknown as {
              language: string;
              children: { type: string; text: string }[];
            };

            return <CodeBlock items={codeNode.children} language={codeNode.language} />;
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
