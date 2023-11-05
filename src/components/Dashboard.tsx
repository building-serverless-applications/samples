import React from 'react';
import { Grid } from '@mui/material';
import DataCard, { CardData } from './DataCard';


interface Params {
    source?: string
    url?: string
}
interface State {
    items: CardData[]
}

interface ResponseData {
    items: CardData[]
}

class Dashboard extends React.Component<Params, State> {
    state: State = {
        items: []
    }
    timer?: NodeJS.Timeout
    timeoutMs: number = 2000

    componentDidMount(): void {
        if (this.props.source !== undefined) {
            this.setState(() => ({ items: JSON.parse(this.props.source ?? '[]') }))
        }
        if (this.props.url !== undefined) {
            this.Poll()
        }
    }

    componentWillUnmount(): void {
        clearTimeout(this.timer)
    }

    async Poll(): Promise<void> {
        clearTimeout(this.timer)
        if (this.props.url === undefined) {
            console.log('No URL set')
            return
        }
        try {
            const response = await window.fetch(this.props.url);
            const { items }: ResponseData = await response.json();
            if (response.ok) {
                this.setState(() => ({ items: items }));
            } else {
                console.log('Failed to fetch from %s', this.props.url)
            }

            this.timeoutMs = 2000
        } catch (error) {
            console.log("Unable to fetch %s: %s", this.props.url, error)
            // Exponential backoff when failing to fetch
            this.timeoutMs *= 2
            if (this.timeoutMs > 180_000) {
                this.timeoutMs = 180_000
            }
        }

        this.timer = setTimeout(() => this.Poll(), this.timeoutMs)
    }

    render() {
        return <Grid container justifyContent='center' alignItems='center' spacing={2}>
            {this.state.items.map((value, index) => {
                return <Grid item xs={6} key={index}><DataCard {...value}></DataCard></Grid>
            })}
        </Grid>
    }
};

export default Dashboard;