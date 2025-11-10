"use client"

import React from "react"

import { createContext } from "react"

export const AuthContext = createContext()

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
