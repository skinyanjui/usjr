import { render, screen, fireEvent } from '@testing-library/react'
import FAQClient from '../../app/faq/pageClient'
import { faqCategories } from '../../app/faq/data'

// Mock dependencies
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  HelpCircle: () => <div data-testid="icon-HelpCircle" />,
  Truck: () => <div data-testid="icon-Truck" />,
  Container: () => <div data-testid="icon-Container" />,
  Sparkles: () => <div data-testid="icon-Sparkles" />,
  DollarSign: () => <div data-testid="icon-DollarSign" />,
}))

// Mock UI components
jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input data-testid="search-input" {...props} />,
}))
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}))
jest.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children }: any) => <div>{children}</div>,
  AccordionItem: ({ children }: any) => <div>{children}</div>,
  AccordionTrigger: ({ children }: any) => <button>{children}</button>,
  AccordionContent: ({ children }: any) => <div>{children}</div>,
}))

describe('FAQClient', () => {
  it('renders all categories and FAQs initially', () => {
    render(<FAQClient />)

    // Check if all categories are rendered
    faqCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })

    // Check total number of FAQs displayed (via badges)
    const badges = screen.getAllByTestId('badge')
    const totalDisplayed = badges.reduce((acc, badge) => acc + parseInt(badge.textContent || '0'), 0)
    const totalFaqs = faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0)

    expect(totalDisplayed).toBe(totalFaqs)
  })

  it('filters FAQs case-insensitively', () => {
    render(<FAQClient />)

    const searchInput = screen.getByTestId('search-input')
    // Pick a term that exists in one of the FAQs
    const term = 'evansville'

    fireEvent.change(searchInput, { target: { value: term.toUpperCase() } })

    // Check that we still see categories containing this term
    // (Assuming "Evansville" is in the data, which we saw in data.ts)
    expect(screen.queryByText(/General Questions/i)).toBeInTheDocument()
  })

  it('filters by answer content', () => {
    render(<FAQClient />)

    const searchInput = screen.getByTestId('search-input')
    // A specific phrase known to be in an answer but not necessarily a question
    const answerPhrase = 'fully licensed and insured'

    fireEvent.change(searchInput, { target: { value: answerPhrase } })

    // Should verify at least one result shows up
    const badges = screen.getAllByTestId('badge')
    const totalDisplayed = badges.reduce((acc, badge) => acc + parseInt(badge.textContent || '0'), 0)
    expect(totalDisplayed).toBeGreaterThan(0)
  })

  it('shows no results for non-matching term', () => {
    render(<FAQClient />)

    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'xyznonexistentterm123' } })

    const badges = screen.queryAllByTestId('badge')
    expect(badges.length).toBe(0)
  })

  it('restores all FAQs when search is cleared', () => {
    render(<FAQClient />)

    const searchInput = screen.getByTestId('search-input')

    // Filter first
    fireEvent.change(searchInput, { target: { value: 'junk' } })
    let badges = screen.getAllByTestId('badge')
    let count = badges.reduce((acc, badge) => acc + parseInt(badge.textContent || '0'), 0)
    expect(count).toBeLessThan(faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0))

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } })

    badges = screen.getAllByTestId('badge')
    count = badges.reduce((acc, badge) => acc + parseInt(badge.textContent || '0'), 0)
    expect(count).toBe(faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0))
  })
})
