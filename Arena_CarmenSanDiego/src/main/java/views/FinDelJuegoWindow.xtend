package views

import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.widgets.Panel
import org.uqbar.arena.windows.WindowOwner
import org.uqbar.arena.widgets.Label
import orden.OrdenEmitida
import java.awt.Color
import static extension org.uqbar.arena.xtend.ArenaXtendExtensions.*
import org.uqbar.arena.widgets.Button
import applicationModels.FinDelJuegoAppModel

class FinDelJuegoWindow extends SimpleWindow<FinDelJuegoAppModel> {


    override createMainTemplate(Panel finalPanel) {

        this.title = "Robo del Faraón - Resuelto"
        if(this.modelObject.esElVIllano()){
            juegoGanado(finalPanel)
        }else{ juegoPerdido(finalPanel)}

      }

    def juegoGanado(Panel mainPanel){

        new Label(mainPanel).text = "En Hora Buena!!!"
        new Label(mainPanel).text = "He detenido a "+ this.modelObject.getOcupanteDelLugar.getNombre +
                " y recuperado el " + this.modelObject.getNombreDeCaso
        new Label(mainPanel) => [
            text ="Felicitaciones!!!"
            background = Color.GREEN
        ]

        new Button(mainPanel) => [
            caption = "Disfrutar de nuestra victoria"
            onClick[ | this.close ]
        ]
    }

    def juegoPerdido(Panel mainPanel){

        //JUEGO Perdido
        new Label(mainPanel) => [
            text ="Mala Noticia!!!"
            background = Color.RED
        ]
        new Label(mainPanel).text = "He detenido a "+ this.modelObject.getOcupanteDelLugar.getNombre +
                " pero usted tenia una orden de arresto contra " + this.modelObject.getVillanoDeLaOrdenEmitida.getNombre

        new Label(mainPanel).text = "Lamentablemente el crimen queda impune"

        new Button(mainPanel) => [
            caption = "Aceptar el error cometido"
            onClick[ | this.close ]
        ]
    }


    override addActions(Panel actionsPanel) {
        throw new UnsupportedOperationException()
    }

    override createFormPanel(Panel mainPanel) {
        throw new UnsupportedOperationException()
    }

    new (WindowOwner parent, FinDelJuegoAppModel model) {
        super(parent, model)
    }





}