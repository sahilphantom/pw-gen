import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'

function PasswordGenerator() {
    const [password, setPassword] = useState('P4$5W0rD!')
    const [length, setLength] = useState(10)
    const [copied, setCopied] = useState(false)
    const [options, setOptions] = useState({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false
    })
  
    const generatePassword = () => {
      let charset = ''
      if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
      if (options.numbers) charset += '0123456789'
      if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
      let newPassword = ''
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        newPassword += charset[randomIndex]
      }
      setPassword(newPassword)
      setCopied(false)
    }
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  
    const calculateStrength = () => {
      let score = 0
      const checks = Object.values(options).filter(Boolean).length
  
      if (length >= 8) score++
      if (length >= 12) score++
      if (checks >= 3) score++
      if (checks === 4) score++
  
      if (score <= 1) return { text: 'WEAK', value: 1 }
      if (score === 2) return { text: 'MEDIUM', value: 2 }
      if (score === 3) return { text: 'STRONG', value: 3 }
      return { text: 'VERY STRONG', value: 4 }
    }
  
    const strength = calculateStrength()
  return (
    <div className="min-h-screen bg-[#18171F] flex flex-col items-center justify-center p-4 font-mono">
    <h1 className="text-2xl text-gray-400 mb-4">Password Generator</h1>
    
    <div className="w-full max-w-md">
      <div className="bg-[#24232C] p-4 flex justify-between items-center mb-4">
        <span className="text-xl text-gray-200 font-mono">
          {password}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="text-[#A4FFAF] hover:text-white transition-colors"
        >
          <Copy className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="bg-[#24232C] p-6 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-200">Character Length</label>
            <span className="text-[#A4FFAF] text-2xl">{length}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-[#18171F] rounded-lg appearance-none cursor-pointer accent-[#A4FFAF]"
          />
        </div>

        <div className="space-y-4">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => 
                  setOptions(prev => ({
                    ...prev,
                    [key]: e.target.checked
                  }))
                }
                className="w-5 h-5 accent-[#A4FFAF] bg-[#18171F] border-gray-600"
              />
              <span className="text-gray-200">
                Include {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </label>
          ))}
        </div>

        <div className="bg-[#18171F] p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">STRENGTH</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-200">{strength.text}</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 border-2 ${
                      i < strength.value
                        ? 'bg-[#A4FFAF] border-[#A4FFAF]'
                        : 'border-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePassword}
          className="w-full bg-[#A4FFAF] text-[#24232C] py-4 font-bold 
                   hover:bg-transparent hover:text-[#A4FFAF] border-2 
                   border-[#A4FFAF] transition-colors flex items-center 
                   justify-center gap-2"
        >
          GENERATE
          <span className="text-lg">→</span>
        </motion.button>
      </div>
    </div>
  </div>
);
  
}

export default PasswordGenerator
