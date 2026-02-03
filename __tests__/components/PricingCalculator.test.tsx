import { render, screen, fireEvent } from '@testing-library/react';
import { PricingCalculator } from '@/components/pricing-calculator';

describe('PricingCalculator', () => {
  it('renders correctly', () => {
    render(<PricingCalculator />);
    expect(screen.getByText('Pricing Calculator')).toBeInTheDocument();
    expect(screen.getByText('Service Type')).toBeInTheDocument();
  });

  it('updates price based on selection', () => {
    render(<PricingCalculator />);

    // Select service type
    const trigger = screen.getByLabelText('Service Type');
    fireEvent.click(trigger);

    // Select 'Junk Removal'
    const option = screen.getByText('Junk Removal');
    fireEvent.click(option);

    // Initial load size is 25%, Price for Junk Removal <= 25 is 89
    // The calculated price range is 0.9 * 89 to 1.1 * 89
    // 89 * 0.9 = 80.1 -> 80
    // 89 * 1.1 = 97.9 -> 98
    expect(screen.getByText('$80 - $98')).toBeInTheDocument();

    // Change Load Size
    // Note: The input has type="range"
    const slider = screen.getByLabelText(/Project Size:/);
    fireEvent.change(slider, { target: { value: '50' } });

    // Junk Removal <= 50 is 179
    // 179 * 0.9 = 161.1 -> 161
    // 179 * 1.1 = 196.9 -> 197
    expect(screen.getByText('$161 - $197')).toBeInTheDocument();
  });

  it('updates price when changing item count', () => {
    render(<PricingCalculator />);

    // Select service type
    const trigger = screen.getByLabelText('Service Type');
    fireEvent.click(trigger);
    const option = screen.getByText('Junk Removal');
    fireEvent.click(option);

    // Initial item count is 5 (no multiplier increase)
    // Multiplier is 1.0. Price is 89. Range: 80-98.
    expect(screen.getByText('$80 - $98')).toBeInTheDocument();

    // Increase item count to > 10 (e.g. 15) -> +0.2 multiplier
    const slider = screen.getByLabelText(/Item Count:/);
    fireEvent.change(slider, { target: { value: '15' } });

    // Multiplier = 1.2
    // Base Price = 89
    // Final = 89 * 1.2 = 106.8
    // Min = 106.8 * 0.9 = 96.12 -> 96
    // Max = 106.8 * 1.1 = 117.48 -> 117
    expect(screen.getByText('$96 - $117')).toBeInTheDocument();
  });
});
