import { render, screen } from '@testing-library/react'
import { ThemedButton } from '@/components/ui/themed-button'

describe('ThemedButton', () => {
  it('renders correctly with default props', () => {
    render(<ThemedButton>Click me</ThemedButton>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-red-700') // Default theme is red
  })

  it('applies theme colors correctly', () => {
    render(<ThemedButton theme="blue">Blue Button</ThemedButton>)
    
    const button = screen.getByRole('button', { name: /blue button/i })
    expect(button).toHaveClass('bg-blue-700')
  })

  it('applies outline variant correctly', () => {
    render(
      <ThemedButton theme="green" variant="outline">
        Outline Button
      </ThemedButton>
    )
    
    const button = screen.getByRole('button', { name: /outline button/i })
    expect(button).toHaveClass('border-green-800', 'text-green-800', 'bg-transparent')
  })

  it('applies full width when specified', () => {
    render(<ThemedButton fullWidth>Full Width</ThemedButton>)
    
    const button = screen.getByRole('button', { name: /full width/i })
    expect(button).toHaveClass('w-full')
  })
})