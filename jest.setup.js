import '@testing-library/jest-dom'

jest.mock('lucide-react', () => ({
  CheckIcon: () => <svg />,
  ChevronDownIcon: () => <svg />,
  ChevronUpIcon: () => <svg />,
  Upload: () => <svg />,
  Camera: () => <svg />,
  X: () => <svg />,
  CheckCircle: () => <svg />,
  Leaf: () => <svg />,
  Shield: () => <svg />,
  Clock: () => <svg />,
}));
