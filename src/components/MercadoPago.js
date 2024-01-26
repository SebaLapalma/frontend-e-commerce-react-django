import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function mercadopago(){
  initMercadoPago('TEST-d56b6131-9b6d-4a28-92df-6d54957ae376')
}

<Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />