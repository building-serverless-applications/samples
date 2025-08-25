import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import Dashboard from './Dashboard';
import theme from '../theme';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Utility to render Dashboard with theme
const renderDashboard = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Dashboard {...props} />
    </ThemeProvider>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    renderDashboard();
    // Look for the Grid container element
    const gridContainer = document.querySelector('.MuiGrid-container');
    expect(gridContainer).toBeInTheDocument();
  });

  test('renders with static source data', () => {
    const sourceData = JSON.stringify([
      {
        title: 'Test Card 1',
        content: 'Test content 1',
      },
      {
        title: 'Test Card 2', 
        content: 'Test content 2',
      }
    ]);

    renderDashboard({ source: sourceData });

    expect(screen.getByText('Test Card 1')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getByText('Test content 1')).toBeInTheDocument();
    expect(screen.getByText('Test content 2')).toBeInTheDocument();
  });

  test('fetches data from URL when provided', async () => {
    const mockData = {
      items: [
        {
          title: 'API Card 1',
          content: 'API content 1',
        },
        {
          title: 'API Card 2',
          content: 'API content 2',
        }
      ]
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    await act(async () => {
      renderDashboard({ url: '/api/dashboard' });
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/dashboard');

    await waitFor(() => {
      expect(screen.getByText('API Card 1')).toBeInTheDocument();
      expect(screen.getByText('API Card 2')).toBeInTheDocument();
    });
  });

  test('handles fetch errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ items: [] }),
    });

    await act(async () => {
      renderDashboard({ url: '/api/dashboard' });
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch from %s', '/api/dashboard');
    });

    consoleSpy.mockRestore();
  });

  test('polls for new data every 2 seconds', async () => {
    const mockData = {
      items: [
        {
          title: 'Poll Card',
          content: 'Poll content',
        }
      ]
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    await act(async () => {
      renderDashboard({ url: '/api/dashboard' });
    });

    // First call on mount
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Advance timers by 2 seconds and wait for the next poll
    await act(async () => {
      jest.advanceTimersByTime(2000);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(2);
      });
    });

    // Advance timers by another 2 seconds
    await act(async () => {
      jest.advanceTimersByTime(2000);
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(3);
      });
    });
  });

  test('clears timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { unmount } = renderDashboard({ url: '/api/dashboard' });
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  test('handles missing URL gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    renderDashboard({ url: undefined });

    // No fetch should be called
    expect(mockFetch).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('handles network errors', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      renderDashboard({ url: '/api/dashboard' });
    });

    // Wait for the error to be handled
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/dashboard');
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching data from %s:', '/api/dashboard', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('renders empty grid when no items', () => {
    renderDashboard();
    
    const gridContainer = document.querySelector('.MuiGrid-container');
    expect(gridContainer).toBeInTheDocument();
    if (gridContainer) {
      expect(gridContainer.children).toHaveLength(0);
    }
  });

  test('updates state when new data arrives', async () => {
    const initialData = {
      items: [
        {
          title: 'Initial Card',
          content: 'Initial content',
        }
      ]
    };

    const updatedData = {
      items: [
        {
          title: 'Updated Card',
          content: 'Updated content',
        }
      ]
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => initialData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedData,
      });

    await act(async () => {
      renderDashboard({ url: '/api/dashboard' });
    });

    // Wait for initial data
    await waitFor(() => {
      expect(screen.getByText('Initial Card')).toBeInTheDocument();
    });

    // Advance timers to trigger next poll
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    // Wait for updated data
    await waitFor(() => {
      expect(screen.getByText('Updated Card')).toBeInTheDocument();
      expect(screen.queryByText('Initial Card')).not.toBeInTheDocument();
    });
  });
});