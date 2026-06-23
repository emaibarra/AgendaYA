import { confirmReservation } from "@/lib/reservation";


test("Id que no sea reconocido por la reserva", ()=>{
    expect(() => confirmReservation(99)).toThrow("Reserva inexistente")
})

test("Id correcto en la reserva", () =>{
    const reservaConfirmada = confirmReservation(1); 
    expect(reservaConfirmada.confirmed).toBe(true)
})

test("Lanza error en reserva ya confirmada", () =>{
    expect(() => confirmReservation(1)).toThrow("Reserva ya confirmada")
})

