import type { SerializedListItemNode, SerializedListNode } from '@lexical/list';
import type { SerializedHeadingNode } from '@lexical/rich-text';
import type { LinkFields, SerializedLinkNode } from '@payloadcms/richtext-lexical';
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from 'lexical';

import escapeHTML from 'escape-html';
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
import { toKebabCase } from '@/utils/toKebabCase';
import { cn } from '@/utils/cn';

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
              <Tag key={index} className={format} id={toKebabCase(String(node.children))}>
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

            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? 'component--list-item-checkbox-checked'
                      : 'component--list-item-checked-unchecked'
                  } ${format}`}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li className={format} key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              );
            }
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

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
