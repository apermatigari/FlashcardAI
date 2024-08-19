import Image from "next/image";

import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Paper } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3001' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ fontFamily: 'Roboto, sans-serif' }}>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create Flashcard from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 'none', py: 2 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ textTransform: 'none', mr: 2 }}>Login</Button>
            <Button color="inherit" href="/sign-up" sx={{ textTransform: 'none' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h6" component="h2" sx={{ color: '#666', my: 2 }}>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4, mr: 2, px: 4, py: 1.5, borderRadius: '25px', textTransform: 'none', fontSize: '1rem' }} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 4, px: 4, py: 1.5, borderRadius: '25px', textTransform: 'none', fontSize: '1rem' }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333', mb: 6 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1: Spaced Repetition System */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '15px', textAlign: 'center', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Spaced Repetition System</Typography>
              <Typography sx={{ color: '#666' }}>
                Use our intelligent Spaced Repetition System to optimize your study sessions and ensure long-term retention.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 2: Customizable Decks and Cards */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '15px', textAlign: 'center', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Customizable Decks and Cards</Typography>
              <Typography sx={{ color: '#666' }}>
                Create and customize your own flashcard decks. Add images, audio, and text to make your learning experience unique.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 3: Progress Tracking and Analytics */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '15px', textAlign: 'center', backgroundColor: '#f9f9f9', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)' } }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Progress Tracking and Analytics</Typography>
              <Typography sx={{ color: '#666' }}>
                Track your progress with detailed analytics. See your strengths and areas for improvement with visual feedback.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing plans */}
        </Grid>
      </Box>
    </Container>
  );
}