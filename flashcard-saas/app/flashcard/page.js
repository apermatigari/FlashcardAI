'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import {collection, doc, getDoc, getDocs} from 'firebase/firestore'
import { db } from '@/firebase'

import { useSearchParams } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, CircularProgress, Box } from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  useEffect(() => {
    let isMounted = true

    async function getFlashcard() {
      if (!search || !user) return

      try {
        const colRef = collection(doc(collection(db, 'users'), user.id), search)
        const docs = await getDocs(colRef)
        const flashcards = []
        docs.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() })
        })

        if (isMounted) {
          setFlashcards(flashcards)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch flashcards')
          setLoading(false)
        }
      }
    }

    getFlashcard()

    return () => {
      isMounted = false
    }
  }, [search, user])

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading flashcards...
        </Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card sx={{ perspective: '1000px' }}>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent sx={{ position: 'relative', height: '200px', transformStyle: 'preserve-3d', transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0)', transition: 'transform 0.6s' }}>
                  <Box sx={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Typography variant="h5" component="div">
                      {flashcard.front}
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                    <Typography variant="h5" component="div">
                      {flashcard.back}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}