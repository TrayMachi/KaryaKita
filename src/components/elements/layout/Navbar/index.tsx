import React from 'react'
import { TransitionLink } from '@/components/utils/TransitionLink'

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      <TransitionLink href="/">Home</TransitionLink>
      <TransitionLink href="/about">About</TransitionLink>
    </ nav>
  )
}
