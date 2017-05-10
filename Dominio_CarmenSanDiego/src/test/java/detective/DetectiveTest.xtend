package detective

import baseCentralAcme.BaseCentralAcme
import lugar.Biblioteca
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import pais.Pais

import static org.mockito.Mockito.*
import ocupante.Villano

class DetectiveTest {

    Detective sherlockHolmes
    Pais argentina
    Pais unPaisMock
    BaseCentralAcme acme

    @Before
    def void setUp() {
        unPaisMock = mock(Pais)
        acme = mock(BaseCentralAcme)

        argentina = mock(Pais)
        when(argentina.nombre).thenReturn("Argentina")

        sherlockHolmes = new Detective(acme,unPaisMock)
    }

    @Test
    def void detectiveEstaEnArgentina() {
        sherlockHolmes.viajar(argentina)
        Assert.assertEquals("Argentina", sherlockHolmes.lugarActual.nombre)
    }

    @Test
    def void visitarUnLugar() {
        var biblioteca = mock(Biblioteca)
        when(biblioteca.mostrarPistas(sherlockHolmes.ordenEmitida)).thenReturn("Bandera Blanca y Celeste")

        Assert.assertEquals(sherlockHolmes.visitar(biblioteca),"Bandera Blanca y Celeste")
    }

    @Test
    def void emitirOrden() {
        var villanoMock = mock(Villano)
        sherlockHolmes.emitirOrden(villanoMock)

        Assert.assertEquals(sherlockHolmes.ordenEmitida.getVillano,villanoMock)
    }
}