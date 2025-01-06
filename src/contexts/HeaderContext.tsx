import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole } from '../types/auth';

interface HeaderState {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onSectionChange?: (sectionId: string) => void;
}

interface HeaderContextType {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onSectionChange?: (sectionId: string) => void;
  setHeaderState: (state: Partial<HeaderState> | ((prev: HeaderState) => Partial<HeaderState>)) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export function HeaderProvider({ children }: HeaderProviderProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('candidate');
  const [sections, setSections] = useState<Array<{ id: string; label: string }>>([
    { id: 'hero', label: 'Overview' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'features', label: 'Features' },
    { id: 'metrics', label: 'Success Metrics' },
  ]);
  const [activeSection, setActiveSection] = useState('hero');
  const [sectionChangeHandler, setSectionChangeHandler] = useState<((sectionId: string) => void) | undefined>();

  const onRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  const setHeaderState = (state: Partial<HeaderState> | ((prev: HeaderState) => Partial<HeaderState>)) => {
    const newState = typeof state === 'function'
      ? state({ sections, activeSection, onSectionChange: sectionChangeHandler })
      : state;

    if (newState.sections !== undefined) {
      setSections(newState.sections);
    }
    if (newState.activeSection !== undefined) {
      setActiveSection(newState.activeSection);
    }
    if (newState.onSectionChange !== undefined) {
      setSectionChangeHandler(newState.onSectionChange);
    }
  };

  return (
    <HeaderContext.Provider
      value={{
        activeRole,
        onRoleChange,
        sections,
        activeSection,
        onSectionChange: sectionChangeHandler,
        setHeaderState,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
