import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOptions } from 'react-plaid-link'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState('')

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.link_token)
    }

    getLinkToken()
  
  , [user]})

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    })

    router.push('/')
  }, [user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config)

  return (
    <>
      {variant === 'primary' ? (
        <Button 
          onClick={() => open}
          disabled={!ready}
          className='plaidlink-primary'
        >
          Connect Bank
        </Button>
        ) : variant === 'ghost' ? (
          <Button>
            Connect bank
          </Button>
        ) : (
          <Button>
            Connect bank
          </Button>
        )}
    </>
  )
}

export default PlaidLink