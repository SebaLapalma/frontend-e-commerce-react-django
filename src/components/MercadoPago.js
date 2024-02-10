import React, { useState } from "react"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
import axios from "axios"

function Mercadopago() {
    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago('TEST-bc16cac7-44f6-4ad7-8460-7073b9bb1ce2')

    const createPreference = async () => {
        try {
            const response = await axios.post('http://localhost:8080/create_preference', {
                    description: 'laura',
                    price: 1,
                    quantity: 1,
                }
            )
            const { id } = await axios.get(response.data)
            console.log(response)
            return id
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        if (id) {
            setPreferenceId(id)
        }
        console.log(preferenceId)
    }

  return (
    <div>
        <div>
            <button onClick={handleBuy}>
                Confirmar compra
            </button>
            {preferenceId && <Wallet initialization={{preferenceId}} />}
        </div>
    </div>
    )
}

export default Mercadopago