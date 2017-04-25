package orden

import excepciones.NoEstaElVillanoException

class OrdenNula extends Orden{

    override fueEmitida() {
        0
    }

    override esElVillano(String sospechoso) {
        false
    }

    override nombre() {
        "Nadie"
    }

    override getVillano() {
        throw new NoEstaElVillanoException()
    }
}