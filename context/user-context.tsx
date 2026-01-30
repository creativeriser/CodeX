"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface UserProfile {
    fullName: string
    email: string
    phone: string
    school: string
    department: string
    discipline: string
    designation: string
    specialization: string
    avatar?: string
    shortlist: number[] // IDs of shortlisted companies
}

interface UserContextType {
    user: UserProfile
    updateUser: (updates: Partial<UserProfile>) => void
    toggleShortlist: (id: number) => void
}

const defaultUser: UserProfile = {
    fullName: "Sarah Connor",
    email: "prof.sarah@university.edu",
    phone: "+91 11-2345-6789",
    school: "School of Engineering & Technology",
    department: "Computer Science & Engineering",
    discipline: "Computer Science",
    designation: "Senior Professor",
    specialization: "Artificial Intelligence & Machine Learning",
    shortlist: []
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile>(defaultUser)

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev, ...updates }))
    }

    const toggleShortlist = (id: number) => {
        setUser(prev => {
            const list = prev.shortlist || []
            const exists = list.includes(id)
            return {
                ...prev,
                shortlist: exists
                    ? list.filter(itemId => itemId !== id)
                    : [...list, id]
            }
        })
    }

    return (
        <UserContext.Provider value={{ user, updateUser, toggleShortlist }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
