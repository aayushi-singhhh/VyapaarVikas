# VyapaarVikas MSME Dashboard - Development Guidelines

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Development Standards](#development-standards)
3. [Code Style Guidelines](#code-style-guidelines)
4. [Component Development](#component-development)
5. [TypeScript Guidelines](#typescript-guidelines)
6. [CSS and Styling](#css-and-styling)
7. [File Organization](#file-organization)
8. [Git Workflow](#git-workflow)
9. [Testing Standards](#testing-standards)
10. [Performance Guidelines](#performance-guidelines)
11. [Accessibility Standards](#accessibility-standards)
12. [Internationalization (i18n)](#internationalization-i18n)
13. [Security Guidelines](#security-guidelines)
14. [Documentation Standards](#documentation-standards)
15. [Code Review Process](#code-review-process)

---

## 🎯 Project Overview

VyapaarVikas is a business growth platform for Indian MSMEs and student entrepreneurs. Our codebase should reflect the same quality and attention to detail that we expect in our user experience.

### **Core Principles**
- **User-Centric**: Every line of code should enhance user experience
- **Performance First**: Optimize for speed and efficiency
- **Accessibility**: Ensure inclusive design for all users
- **Maintainability**: Write code that's easy to understand and modify
- **Cultural Sensitivity**: Respect Indian business practices and multilingual needs

---

## 🛠️ Development Standards

### **Tech Stack Requirements**
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks + Context API
- **Package Manager**: npm (consistent across team)

### **Environment Setup**
```bash
# Required Node.js version
node: ">=18.0.0"

# Recommended VS Code extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
```

---

## 🎨 Code Style Guidelines

### **General Formatting**
```typescript
// ✅ Good - Consistent formatting
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState<StateType>(initialValue);
  
  const handleAction = useCallback(() => {
    // Action logic here
  }, [dependencies]);

  return (
    <div className="container">
      <Component prop={value} />
    </div>
  );
}

// ❌ Bad - Inconsistent formatting
export function componentName({prop1,prop2}:ComponentProps){
const[state,setState]=useState(initialValue)
return<div className="container"><Component prop={value}/></div>
}
```

### **Naming Conventions**

#### **Files and Directories**
```
✅ Good:
- PascalCase for components: `MyBusiness.tsx`
- camelCase for utilities: `formatCurrency.ts`
- kebab-case for pages: `competitor-spy.tsx`
- lowercase for directories: `components/`, `utils/`

❌ Bad:
- myBusiness.tsx
- FormatCurrency.ts
- Competitor_Spy.tsx
```

#### **Variables and Functions**
```typescript
// ✅ Good - Descriptive names
const isUserAuthenticated = true;
const userBusinessData = await fetchBusinessData();
const handleCompetitorAnalysis = () => {};

// ❌ Bad - Unclear names
const flag = true;
const data = await fetch();
const handle = () => {};
```

#### **Constants**
```typescript
// ✅ Good - UPPER_SNAKE_CASE
const API_ENDPOINTS = {
  COMPETITOR_DATA: '/api/competitors',
  BUSINESS_METRICS: '/api/metrics'
} as const;

const DEFAULT_CURRENCY = 'INR';
const MAX_RETRY_ATTEMPTS = 3;
```

---

## 🧩 Component Development

### **Component Structure**
```typescript
"use client"; // Only when necessary

import React, { useState, useCallback, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/currency';

// 1. Interface definitions
interface ComponentNameProps {
  title: string;
  isVisible?: boolean;
  onAction?: (data: ActionData) => void;
}

interface ActionData {
  id: string;
  value: number;
}

// 2. Component implementation
export function ComponentName({ 
  title, 
  isVisible = true, 
  onAction 
}: ComponentNameProps) {
  // 3. State declarations
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ActionData[]>([]);

  // 4. Computed values
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // 5. Event handlers
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      // Handle submission
      onAction?.(newData);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onAction]);

  // 6. Effects
  useEffect(() => {
    // Component initialization
  }, []);

  // 7. Early returns
  if (!isVisible) return null;

  // 8. Main render
  return (
    <div className="component-container">
      <h2 className="component-title">{title}</h2>
      <div className="component-content">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ContentComponent data={data} />
        )}
      </div>
      <Button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}
```

### **Component Guidelines**

#### **Props Design**
```typescript
// ✅ Good - Clear, typed props
interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    revenue: number;
    category: BusinessCategory;
  };
  showDetails?: boolean;
  onEdit?: (businessId: string) => void;
  className?: string;
}

// ❌ Bad - Unclear props
interface BusinessCardProps {
  data: any;
  flag: boolean;
  callback: () => void;
}
```

#### **State Management**
```typescript
// ✅ Good - Specific state types
const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>({
  revenue: 0,
  growth: 0,
  customers: 0
});

// ✅ Good - Derived state
const growthPercentage = useMemo(() => 
  businessMetrics.revenue > 0 
    ? (businessMetrics.growth / businessMetrics.revenue) * 100 
    : 0
, [businessMetrics.revenue, businessMetrics.growth]);

// ❌ Bad - Generic state
const [data, setData] = useState<any>({});
```

---

## 📝 TypeScript Guidelines

### **Type Definitions**
```typescript
// ✅ Good - Explicit types
interface BusinessData {
  readonly id: string;
  name: string;
  revenue: number;
  category: 'textile' | 'food' | 'electronics' | 'other';
  isActive: boolean;
  createdAt: Date;
  metrics?: BusinessMetrics;
}

type BusinessCategory = BusinessData['category'];
type BusinessStatus = 'active' | 'inactive' | 'pending';

// ✅ Good - Utility types
type CreateBusinessRequest = Omit<BusinessData, 'id' | 'createdAt'>;
type UpdateBusinessRequest = Partial<Pick<BusinessData, 'name' | 'category'>>;
```

### **API Types**
```typescript
// ✅ Good - API response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

interface CompetitorApiResponse {
  competitors: CompetitorData[];
  totalCount: number;
  hasMore: boolean;
}

// ✅ Good - Error handling
type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};
```

### **Avoid Any Type**
```typescript
// ✅ Good - Specific types
interface FormData {
  businessName: string;
  revenue: number;
  category: BusinessCategory;
}

const handleFormSubmit = (data: FormData) => {
  // Type-safe operations
};

// ❌ Bad - Using any
const handleFormSubmit = (data: any) => {
  // No type safety
};
```

---

## 🎨 CSS and Styling

### **Tailwind CSS Guidelines**

#### **Class Organization**
```tsx
// ✅ Good - Logical grouping
<div className="
  flex items-center justify-between
  w-full max-w-4xl mx-auto
  p-6 mb-4
  bg-white/80 backdrop-blur-lg
  rounded-2xl shadow-lg
  border border-white/20
  transition-all duration-300
  hover:shadow-xl
">
```

#### **Custom CSS Variables**
```css
/* ✅ Good - Semantic naming */
:root {
  --vyapaar-primary: #1e40af;
  --vyapaar-secondary: #eab308;
  --vyapaar-success: #10b981;
  --vyapaar-error: #ef4444;
  --vyapaar-glass-bg: rgba(255, 255, 255, 0.25);
  --vyapaar-glass-border: rgba(255, 255, 255, 0.18);
}

/* ✅ Good - Component-specific styles */
.glass-card {
  background: var(--vyapaar-glass-bg);
  border: 1px solid var(--vyapaar-glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dashboard-metric {
  @apply bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30;
}
```

#### **Responsive Design**
```tsx
// ✅ Good - Mobile-first approach
<div className="
  grid grid-cols-1 gap-4
  md:grid-cols-2 md:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
```

### **Component Styling Patterns**
```tsx
// ✅ Good - Consistent patterns
const cardStyles = {
  base: "rounded-2xl p-6 shadow-lg border",
  variants: {
    glass: "bg-white/80 backdrop-blur-lg border-white/20",
    solid: "bg-white border-gray-200",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white"
  }
};

// Usage
<div className={`${cardStyles.base} ${cardStyles.variants.glass}`}>
```

---

## 📁 File Organization

### **Directory Structure**
```
src/
├── app/                          # Next.js app directory
│   ├── (auth)/                  # Route groups
│   ├── dashboard/               # Dashboard pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                   # React components
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── metrics/            # Metric components
│   │   ├── charts/             # Chart components
│   │   └── forms/              # Form components
│   ├── ui/                     # Reusable UI components
│   │   ├── base/               # Base components (Button, Input)
│   │   ├── layout/             # Layout components
│   │   └── feedback/           # Loading, Error components
│   └── shared/                 # Shared business components
├── hooks/                       # Custom React hooks
│   ├── useBusinessData.ts      # Business-specific hooks
│   ├── useAuth.ts              # Authentication hooks
│   └── useLocalStorage.ts      # Utility hooks
├── lib/                        # Utility libraries
│   ├── api/                    # API utilities
│   ├── utils/                  # General utilities
│   ├── constants/              # Application constants
│   └── types/                  # TypeScript type definitions
├── providers/                   # React context providers
├── styles/                     # Additional styling
└── public/                     # Static assets
```

### **File Naming Rules**
```
Components:     PascalCase.tsx     (BusinessCard.tsx)
Pages:          kebab-case.tsx     (competitor-analysis.tsx)
Hooks:          camelCase.ts       (useBusinessData.ts)
Utils:          camelCase.ts       (formatCurrency.ts)
Types:          camelCase.ts       (businessTypes.ts)
Constants:      camelCase.ts       (apiEndpoints.ts)
```

---

## 🔄 Git Workflow

### **Branch Naming**
```bash
# Feature branches
feature/competitor-spy-enhancement
feature/ai-assistant-integration

# Bug fixes
bugfix/dashboard-loading-issue
hotfix/critical-auth-bug

# Chores
chore/update-dependencies
docs/update-readme
```

### **Commit Message Format**
```bash
# Format: type(scope): description

# Types: feat, fix, docs, style, refactor, test, chore
feat(dashboard): add competitor analysis chart
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(api): simplify data fetching logic
test(components): add unit tests for BusinessCard
chore(deps): update Next.js to v14.1
```

### **Commit Message Examples**
```bash
✅ Good commits:
feat(competitor): implement local competition mapping
fix(dashboard): resolve mobile layout overflow
docs(guidelines): add TypeScript coding standards
refactor(utils): optimize currency formatting function

❌ Bad commits:
fixed bug
updated component
changes
wip
```

---

## 🧪 Testing Standards

### **Unit Testing**
```typescript
// ✅ Good - Comprehensive test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BusinessCard } from './BusinessCard';
import { mockBusinessData } from '@/tests/mocks';

describe('BusinessCard', () => {
  it('should display business information correctly', () => {
    render(<BusinessCard business={mockBusinessData} />);
    
    expect(screen.getByText(mockBusinessData.name)).toBeInTheDocument();
    expect(screen.getByText(`₹${mockBusinessData.revenue.toLocaleString()}`)).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const mockOnEdit = jest.fn();
    render(<BusinessCard business={mockBusinessData} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(mockBusinessData.id);
    });
  });
});
```

### **Integration Testing**
```typescript
// ✅ Good - User flow testing
describe('Dashboard Integration', () => {
  it('should load and display competitor data', async () => {
    render(<Dashboard />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Competitor Analysis')).toBeInTheDocument();
    });
    
    // Verify competitor cards are displayed
    expect(screen.getAllByTestId('competitor-card')).toHaveLength(3);
  });
});
```

### **Test Organization**
```
tests/
├── __mocks__/                  # Mock data and functions
├── components/                 # Component tests
├── hooks/                      # Hook tests
├── utils/                      # Utility function tests
├── integration/                # Integration tests
└── e2e/                       # End-to-end tests
```

---

## ⚡ Performance Guidelines

### **React Performance**
```typescript
// ✅ Good - Memoization
const BusinessMetrics = memo(({ data }: BusinessMetricsProps) => {
  const formattedRevenue = useMemo(() => 
    formatCurrency(data.revenue), 
    [data.revenue]
  );

  return <div>{formattedRevenue}</div>;
});

// ✅ Good - Callback optimization
const handleBusinessUpdate = useCallback((id: string, data: BusinessData) => {
  updateBusiness(id, data);
}, [updateBusiness]);
```

### **Image Optimization**
```tsx
// ✅ Good - Next.js Image component
import Image from 'next/image';

<Image
  src="/business-logo.jpg"
  alt="Business Logo"
  width={200}
  height={200}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### **Bundle Optimization**
```typescript
// ✅ Good - Dynamic imports
const AIAssistant = dynamic(() => import('./AIAssistant'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

// ✅ Good - Selective imports
import { formatCurrency } from '@/utils/currency';
// instead of
import * as utils from '@/utils';
```

---

## ♿ Accessibility Standards

### **Semantic HTML**
```tsx
// ✅ Good - Semantic structure
<main role="main">
  <header>
    <h1>Business Dashboard</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="#metrics">Metrics</a></li>
        <li><a href="#competitors">Competitors</a></li>
      </ul>
    </nav>
  </header>
  
  <section aria-labelledby="metrics-heading">
    <h2 id="metrics-heading">Business Metrics</h2>
    <div role="region" aria-live="polite">
      {/* Dynamic content */}
    </div>
  </section>
</main>
```

### **ARIA Labels**
```tsx
// ✅ Good - Descriptive labels
<button 
  aria-label="Open competitor analysis for Fashion Hub"
  onClick={() => openAnalysis('fashion-hub')}
>
  <AnalysisIcon aria-hidden="true" />
  Analyze
</button>

<input
  type="text"
  aria-describedby="business-name-help"
  placeholder="Enter business name"
/>
<div id="business-name-help">
  This will be displayed publicly to customers
</div>
```

### **Keyboard Navigation**
```tsx
// ✅ Good - Keyboard support
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleAction();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleAction}
>
  Interactive Element
</div>
```

---

## 🌍 Internationalization (i18n)

### **Content Structure**
```typescript
// ✅ Good - Structured translations
interface Translations {
  dashboard: {
    title: string;
    metrics: {
      revenue: string;
      growth: string;
      customers: string;
    };
    actions: {
      save: string;
      cancel: string;
      export: string;
    };
  };
  competitor: {
    analysis: string;
    nearby: string;
    strength: {
      high: string;
      medium: string;
      low: string;
    };
  };
}

// Usage
const t = useTranslations();
<h1>{t.dashboard.title}</h1>
```

### **Hindi Support**
```typescript
// ✅ Good - Cultural context
const translations = {
  en: {
    business: "Business",
    revenue: "Revenue",
    growth: "Growth"
  },
  hi: {
    business: "व्यापार",
    revenue: "आय",
    growth: "वृद्धि"
  }
} as const;
```

---

## 🔒 Security Guidelines

### **Data Sanitization**
```typescript
// ✅ Good - Input validation
import { z } from 'zod';

const BusinessSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  revenue: z.number().positive(),
  category: z.enum(['textile', 'food', 'electronics', 'other'])
});

const validateBusinessData = (data: unknown) => {
  return BusinessSchema.parse(data);
};
```

### **Environment Variables**
```typescript
// ✅ Good - Environment validation
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  aiApiKey: process.env.AI_API_KEY, // Private - not exposed to client
  isDevelopment: process.env.NODE_ENV === 'development'
};

// Validate required env vars
if (!config.aiApiKey) {
  throw new Error('AI_API_KEY environment variable is required');
}
```

---

## 📚 Documentation Standards

### **Component Documentation**
```typescript
/**
 * BusinessCard component displays business information in a card format.
 * 
 * @example
 * ```tsx
 * <BusinessCard 
 *   business={{
 *     id: "123",
 *     name: "Fashion Store",
 *     revenue: 50000,
 *     category: "textile"
 *   }}
 *   onEdit={handleEdit}
 * />
 * ```
 */
interface BusinessCardProps {
  /** Business data object containing all relevant information */
  business: BusinessData;
  /** Optional callback when user clicks edit button */
  onEdit?: (businessId: string) => void;
  /** Additional CSS classes to apply to the card */
  className?: string;
}

export function BusinessCard({ business, onEdit, className }: BusinessCardProps) {
  // Implementation
}
```

### **Utility Documentation**
```typescript
/**
 * Formats a number as Indian currency (INR)
 * 
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(50000) // "₹50,000"
 * formatCurrency(50000, { compact: true }) // "₹50K"
 */
export function formatCurrency(
  amount: number, 
  options: { compact?: boolean } = {}
): string {
  // Implementation
}
```

---

## 👥 Code Review Process

### **Review Checklist**

#### **Functionality**
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error handling is implemented
- [ ] Performance considerations addressed

#### **Code Quality**
- [ ] Follows TypeScript best practices
- [ ] Proper error handling
- [ ] No console.log statements in production code
- [ ] Appropriate use of React hooks

#### **Testing**
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

#### **Documentation**
- [ ] Code is self-documenting
- [ ] Complex logic is commented
- [ ] README updated if needed
- [ ] API changes documented

### **Review Guidelines**

#### **For Reviewers**
```markdown
✅ Good review comments:
- "Consider using useMemo here for better performance"
- "This could be simplified using the existing utility function"
- "Add error handling for the API call"
- "The accessibility label could be more descriptive"

❌ Poor review comments:
- "This is wrong"
- "Fix this"
- "Bad code"
```

#### **For Authors**
- Write clear commit messages
- Keep PRs focused and small
- Respond to feedback constructively
- Update documentation as needed

---

## 🚀 Deployment Guidelines

### **Pre-deployment Checklist**
- [ ] All tests pass
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Performance metrics acceptable
- [ ] Security scan completed
- [ ] Accessibility audit passed

### **Environment Management**
```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Testing
npm run test
npm run test:e2e
```

---

## 📞 Support and Resources

### **Getting Help**
- **Technical Issues**: Create GitHub issue with detailed description
- **Code Reviews**: Request review from team members
- **Architecture Decisions**: Discuss in team meetings
- **Best Practices**: Refer to this guidelines document

### **Useful Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🔄 Guidelines Updates

This document is living and should be updated as the project evolves. When making changes:

1. Discuss proposed changes with the team
2. Update relevant sections
3. Communicate changes to all team members
4. Update training materials if necessary

**Last Updated**: July 31, 2025  
**Version**: 1.0.0  
**Next Review**: August 31, 2025

---

*Happy coding! Let's build something amazing for Indian entrepreneurs! 🚀*
