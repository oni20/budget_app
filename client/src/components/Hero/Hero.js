import React from 'react';
import '../Header/Header.scss';
import Image from '../../assets/images/background_image.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../Layout/Layout';

const Hero = () => {
    return (
        <section className='hero'>
            <Layout>
                <div className='hero__section'>
                    <Typography variant="h3" component="h2" gutterBottom>
                        Learn how to manage & balance your budget with us!
                    </Typography>
                    <img className='hero__section--image' src={Image} />
                </div>                
                <Button size="large" variant="contained" color="primary" href="/signup">
                    Get started
                </Button>
            </Layout>
        </section>
    );
};

export default Hero;