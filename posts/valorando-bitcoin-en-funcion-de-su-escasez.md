title:      Valorando Bitcoin en función de su escasez.
summary:    Bitcoin es el primer activo digital escaso, descubre como el ratio Stock-to-Flow demuestra que puede superar al oro.
date:       2019-11-10
image:      https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?ixlib
published:  true

---

Satoshi Nakamoto publicó su *white paper* el 31 de octubre de 2008; el 3 de enero de 2009 creó el primer bloque de Bitcoin; y difundió el código de Bitcoin cinco días más tarde. Ahí empieza un camino tras el cual la capitalización de Bitcoin se encuentra ahora mismo (Noviembre 2019) en 159.000 millones de dólares.

Bitcoin es el primer activo digital escaso. Es escaso como el preciado oro, con el cual cual comparte muchas de sus propiedades, las cuales mejora e intensifica para este mundo digital en el que vivimos. **Bitcoin será más escaso, más resistente a la censura, más divisible, más durable y más portable que el oro**.

En este 2019 han resurgido los modelos matemáticos y predictivos, intentando descifrar el futuro valor de Bitcoin. De entre todos ellos el *paper* que considero tiene una base solida entendible y fácilmente medible es [Modeling Bitcoins value with scarcity](https://medium.com/@100trillionUSD/modeling-bitcoins-value-with-scarcity-91fa0fc03e25) de el incansable [PlanB](https://twitter.com/100trillionUSD) el cual plantea algunas conclusiones interesantes respecto a estos interrogantes:

> ¿Qué es la Escasez?, ¿Cuál es su valor?, ¿Cómo se relacionan?

Señalar también que este *paper* no ha cogido sino mas fuerza tras que la predicción por parte del *alterego* de Snowden se fuese al lugar donde nada tiene valor, el cementerio de las altcoin.

![](https://pbs.twimg.com/media/EH5MxsEUEAQClye?format=jpg&name=large)

## Escasez y Stock-to-Flow
Los diccionarios generalmente definen la escasez como *«una situación en la que algo no es fácil de encontrar u obtener»*, o *«la falta de algo»*.

- Saifedean Ammous habla sobre la escasez en términos de relación *Stock-to-Flow* (`SF`).
- Siendo `SF = Stock / Flow`
- `Stock` es el tamaño de las reservas o reservas existentes de un determinado bien.
- `Flow` es la producción anual de ese bien.

En lugar del ratio *Stock-to-Flow*, otros analistas también usan la tasa de crecimiento de la oferta, *supply growth*, (`SG = 1 / (Flow / Stock)`). Veamos ahora algunos ejemplos de *Stock-to-Flow* para distintos activos:

![alt="de"](https://miro.medium.com/max/614/1*T9AtxfkEyEgWPDZ9H2TV-w.png)

El oro tiene un `SF` de 62, el más alto conocido, resultando que se necesitan 62 años de producción para obtener el stock de oro actual. La plata ocupa el segundo lugar con un `SF` de 22. Un alto `SF` es lo que los convierte en reservas de valor.

El paladio, el platino y todos los demás productos, conocidos como *commodities* (petróleo, soja, trigo, maíz), tienen un `SF` que a lo sumo apenas superan 1. Dado que son productos consumibles, el stock existente suele ser igual o inferior a la producción anual. Independientemente si son renovables o no, es casi imposible para éstos obtener un `SF` más alto. Tan pronto como alguien los acumula, el precio aumenta, la producción aumenta y el precio vuelve a caer. Esto es debido a que no son escasos, o mejor dicho, son menos escasos en relación al oro o la plata.

Por lo tanto **la escasez puede ser cuantificada por `SF`**. Es claro entonces que a mayor `SF` mayor es la escasez del bien.

{{banner}}


## Stock-to-Flow y Bitcoin
Bitcoin actualmente tiene un Stock de mas de 18 millones de monedas y un suministro actual de 0.7m/año, el cual sera reducido a la mitad con el próximo *halving* de Mayo de 2020. Esto hace que su `SF` sea 25, y coloca al Bitcoin en la categoría de bienes monetarios como la plata y el oro.

![](https://miro.medium.com/max/2048/1*yGeHubD4FQpCaJxgPVCqdQ.jpeg)

El suministro de Bitcoin es constante. Se crean nuevos Bitcoins por cada nuevo bloque que se añade a la cadena de bloques, en promedio cada 10 minutos. Esta *generación* de bitcoins, es la recompensa (decreciente) que obtienen los mineros por bloque. Inicialmente eran 50 bitcoins, hoy son 12,5 bitcoins por bloque. Dicha cantidad se reduce a la mitad cada 210.000 bloques (aproximadamente 4 años). Los *halvings* también hacen que la tasa de crecimiento de la oferta sea decreciente o deflacionaria, es decir que la curva de emisión (línea azul) se escalone y no se suavice.


## Stock-to-Flow y Valor de Mercado
El Valor de Mercado (`VM`) de Bitcoin a precios actuales es de 159.000 millones de dólares. La hipótesis en este estudio es que la escasez, medida por `SF`, tiene una relación directa con el Valor de Mercado. Una simple mirada a la tabla anterior de `SF`, para los distintos bienes, indica que los valores de mercado tienden a ser más altos a mayores SF. El siguiente paso realizado por PlanB fue recopilar datos y hacer un modelo estadístico.

Se calcularon los `SF` mensuales de Bitcoin y sus respectivos Valores de Mercado desde Diciembre de 2009 a Febrero de 2019 (111 puntos de datos en total).

Una gráfica de dispersión de `SF vs VM` en escalas logarítmicas para cada eje, revelan una buena relación lineal entre `ln(SF)` y `ln(VM)`.

![alt="gráfica de dispersión de SF vs VM"](https://miro.medium.com/max/2100/1*jOLs8eLLbY2yTfk93-a1-Q.png)

Una regresión lineal con estos datos confirma lo que se puede observar a simple vista: una relación estadísticamente significativa entre el Valor de Mercado y el *Stock-to-Flow* (95% R2). La probabilidad de que la relación entre el `SF` y el Valor de Mercado sea casualidad sería cercana a cero.

Debido a que los *halvings* tienen un impacto tan grande en `SF`, el autor diferenció con colores los puntos considerando la cantidad de meses hasta el próximo *halving* (azul oscuro es el mes del *halving* y rojo es el mes justo después).

> Con El próximo halving de Bitcoin (mayo de 2020) el `SF` actual de 25 se duplicará a 50, acercándose al del oro (`SF 62`).

Si utilizamos la fórmula calculada por la regresión `3.32 x ln(SF) + 14.6227` podríamos calcular el `VM`. El Valor de Mercado previsto por la regresión para Bitcoin después de mayo de 2020 es cercano al trillón de dolares, lo que se traduce en un precio de Bitcoin cercano a los $55,000.

{{bannerCoinbase}}


## Conclusión
Así como existen distintos modelos de valoración de activos para las finanzas tradicionales, los modelos para Bitcoin y demás criptoactivos se encuentran en creciente efervescencia.

La metodología planteada en este caso es bastante intuitiva y requiere de conocimientos básicos de estadística. Si bien los modelos estadísticos puedan no ser herramientas perfectas de predicción, creo que se convertirán en un elemento de valoración más, ayudando a determinar el valor a medio y largo plazo de Bitcoin.

Lo que debes aprender es que si **Bitcoin nació de las matemáticas y la criptografía**, ningún modelo que no tenga esos principios en su génesis podrá reflejar la realidad de Bitcoin. Mi recomendación tanto si eres un *newbie* como si llevas tiempo en este apasionante mundo es que absolutamente nunca sigas las instrucciones de los *futurologos* del bitcoin.
