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

  const getBlocksToShow = (block: LayoutBlocks[number]) => {
    const blockType = block.blockType;

    const isBlockExist = Object.keys(blockComponents).includes(blockType);
    const isBlockHidden = 'hideBlock' in block ? block.hideBlock : false;

    return isBlockExist && !isBlockHidden;
  };

  const renderBlocks = (block: LayoutBlocks[number], index: number) => {
    const blockType = block.blockType;
    const Block = blockComponents[blockType];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Block key={index} {...(block as any)} isFirst={index === 0} />;
  };

  return <>{blocks.filter(getBlocksToShow).map(renderBlocks)}</>;
};
