import { Page } from '@/payload-types';
import { Hero } from '@/blocks/Hero';

type LayoutBlocks = Page['layout'];

type BlockComponent = typeof Hero;

const blockComponents: Record<string, BlockComponent> = {
  hero: Hero,
};

export const RenderBlocks = ({ blocks }: { blocks: LayoutBlocks }) => {
  if (!blocks.length) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockType = block.blockType;
        const Block = blockComponents[blockType];

        if (!Block) {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Block key={index} {...(block as any)} isFirst={index === 0} />;
      })}
    </>
  );
};
