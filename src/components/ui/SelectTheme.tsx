'use client';

import { useTheme } from 'next-themes';
import React, { ComponentProps, useEffect, useState } from 'react';

import { Monitor } from '@/icons/Monitor';
import { Moon } from '@/icons/Moon';
import { Sun } from '@/icons/Sun';
import { cn } from '@/utils/cn';

type Theme = {
  key: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  label: string;
};

const THEME_OPTIONS: Theme[] = [
  { key: 'light', Icon: Sun, label: 'Change theme to light' },
  { key: 'dark', Icon: Moon, label: 'Change theme to dark' },
  { key: 'system', Icon: Monitor, label: 'Change theme to system preference' },
];

const SELECTED_POSITION_STYLES: Record<string, string> = {
  system: 'left-[68px]',
  light: 'left-[4px]',
  dark: 'left-[36px]',
};

export const SelectTheme = ({ className, ...rest }: ComponentProps<'div'>) => {
  const { setTheme, theme } = useTheme();
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (theme) {
      setSelectedPosition(SELECTED_POSITION_STYLES[theme] || '');
    }
  }, [theme]);

  const renderThemeButton = ({ key, Icon, label }: Theme) => (
    <button
      key={key}
      className="relative p-1.5 opacity-100 transition-opacity duration-300 enabled:hover:opacity-50"
      onClick={() => setTheme(key)}
      aria-label={isClient && theme !== key ? label : ''}
      role="checkbox"
      aria-checked={isClient && theme === key}
      disabled={isClient && theme === key}
    >
      <Icon className="size-[16px]" />
    </button>
  );

  return (
    <div
      className={cn(
        'relative flex items-center gap-1 p-1 bg-mild border-[1px] border-gray-400 h-full rounded-md text-gray-700 text-text',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'absolute size-[28px] p-1.5 bg-gray-200 bg-gradient-to-b rounded-md from-zinc-200 to-zinc-400 dark:from-zinc-500 dark:to-zinc-700 transition-all duration-300',
          selectedPosition,
          { hidden: !theme || !isClient },
        )}
      />
      {THEME_OPTIONS.map(renderThemeButton)}
    </div>
  );
};
