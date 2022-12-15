import React from 'react';
import { Button, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@mui/material';

interface ImageData {
    url: string  // URL seems hard to get parsed
    alt: string
}

interface Data {
    title: string
    content: string

    url?: string  // URL seems hard to get parsed

    image?: ImageData
}

class DataCard extends React.Component<Data, Data> {
    state: Data = {
        title: "Unknown",
        content: "Empty",
        image: {
            url: 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png',
            alt: 'Knative logo'
        }
    };


    render() {
        let image = this.props.image ?? { url: 'https://knative.dev/docs/images/logo/rgb/knative-logo-rgb.png', alt: 'Knative logo' }
        return (
            <Card>
                <CardActionArea>
                    <CardMedia component='img' alt={image.alt} image={image.url}></CardMedia>
                    < CardContent >
                        <h2>
                            {this.props.title}
                        </h2>

                        {this.props.content}
                    </CardContent>
                </CardActionArea>
                <CardActions> <Button size='small'> Get Info </Button></CardActions>
            </Card>
        );
    }
};

export default DataCard;
export type { Data as CardData };