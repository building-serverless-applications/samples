import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import DataCard, { CardData } from './DataCard';
import theme from '../theme';

// Utility to render DataCard with theme
const renderDataCard = (props: Partial<CardData> = {}) => {
  const defaultProps: CardData = {
    title: 'Test Title',
    content: 'Test Content',
    ...props
  };

  return render(
    <ThemeProvider theme={theme}>
      <DataCard {...defaultProps} />
    </ThemeProvider>
  );
};

describe('DataCard Component', () => {
  test('renders without crashing', () => {
    renderDataCard();
    expect(screen.getByRole('button', { name: /get info/i })).toBeInTheDocument();
  });

  test('displays title and content', () => {
    renderDataCard({
      title: 'Custom Title',
      content: 'Custom Content'
    });

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  test('uses default Knative image when no image provided', () => {
    renderDataCard();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png');
    expect(image).toHaveAttribute('alt', 'Knative logo');
  });

  test('displays custom image when provided', () => {
    renderDataCard({
      image: {
        url: 'https://example.com/custom-image.png',
        alt: 'Custom Alt Text'
      }
    });

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/custom-image.png');
    expect(image).toHaveAttribute('alt', 'Custom Alt Text');
  });

  test('renders title as heading', () => {
    renderDataCard({
      title: 'My Heading Title'
    });

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('My Heading Title');
  });

  test('renders Get Info button', () => {
    renderDataCard();

    const button = screen.getByRole('button', { name: /get info/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Get Info');
  });

  test('renders card structure with proper components', () => {
    renderDataCard();

    // Check for card container
    const card = screen.getByRole('img').closest('[class*="MuiCard-root"]');
    expect(card).toBeInTheDocument();
  });

  test('handles empty title gracefully', () => {
    renderDataCard({
      title: ''
    });

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('');
  });

  test('handles empty content gracefully', () => {
    renderDataCard({
      content: ''
    });

    // Content should be empty but we can check that the component still renders
    const cardContent = screen.getByRole('heading', { level: 2 }).parentElement;
    expect(cardContent).toBeInTheDocument();
  });

  test('handles long title and content', () => {
    const longTitle = 'This is a very long title that might wrap to multiple lines in the card component';
    const longContent = 'This is very long content that should be displayed properly in the card component even when it spans multiple lines and contains a lot of text that users might want to read.';

    renderDataCard({
      title: longTitle,
      content: longContent
    });

    expect(screen.getByText(longTitle)).toBeInTheDocument();
    expect(screen.getByText(longContent)).toBeInTheDocument();
  });

  test('renders with all props provided', () => {
    const fullProps: CardData = {
      title: 'Full Props Title',
      content: 'Full props content',
      url: 'https://example.com/link',
      image: {
        url: 'https://example.com/full-props-image.jpg',
        alt: 'Full props image'
      }
    };

    renderDataCard(fullProps);

    expect(screen.getByText('Full Props Title')).toBeInTheDocument();
    expect(screen.getByText('Full props content')).toBeInTheDocument();
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/full-props-image.jpg');
    expect(image).toHaveAttribute('alt', 'Full props image');
  });

  test('state matches props when provided', () => {
    const testTitle = 'State Test Title';
    const testContent = 'State test content';

    renderDataCard({
      title: testTitle,
      content: testContent
    });

    // Verify the props are rendered correctly
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  test('card is clickable via CardActionArea', () => {
    renderDataCard();

    // The card should have a clickable area
    const cardActionArea = screen.getByRole('img').closest('[class*="MuiCardActionArea-root"]');
    expect(cardActionArea).toBeInTheDocument();
  });
});