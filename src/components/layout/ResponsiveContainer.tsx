import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  fluid?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  fluid = false,
}) => {
  const baseClasses = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
  const maxWidthClasses = fluid ? '' : 'max-w-7xl';
  const combinedClasses = `${baseClasses} ${maxWidthClasses} ${className}`.trim();

  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  gap = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  },
}) => {
  const gridClasses = `
    grid
    grid-cols-${columns.mobile || 1}
    gap-${gap.mobile || 4}
    sm:grid-cols-${columns.tablet || 2}
    sm:gap-${gap.tablet || 6}
    lg:grid-cols-${columns.desktop || 3}
    lg:gap-${gap.desktop || 8}
    ${className}
  `.trim();

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

// Responsive Stack Component
interface ResponsiveStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  horizontal?: boolean;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  className = '',
  spacing = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  },
  horizontal = false,
}) => {
  const stackClasses = `
    flex
    ${horizontal ? 'flex-row' : 'flex-col'}
    space-${horizontal ? 'x' : 'y'}-${spacing.mobile || 4}
    sm:space-${horizontal ? 'x' : 'y'}-${spacing.tablet || 6}
    lg:space-${horizontal ? 'x' : 'y'}-${spacing.desktop || 8}
    ${className}
  `.trim();

  return (
    <div className={stackClasses}>
      {children}
    </div>
  );
};

// Responsive Hide Component
interface ResponsiveHideProps {
  children: React.ReactNode;
  below?: 'sm' | 'md' | 'lg' | 'xl';
  above?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveHide: React.FC<ResponsiveHideProps> = ({
  children,
  below,
  above,
}) => {
  const hideClasses = `
    ${below ? `hidden ${below}:block` : ''}
    ${above ? `${above}:hidden` : ''}
  `.trim();

  return (
    <div className={hideClasses}>
      {children}
    </div>
  );
};
