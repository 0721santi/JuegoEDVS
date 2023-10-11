import pymysql

dbConfig = {
    'host': 'localhost',
    'user': 'root',
    'password': 'juan1',
    'database': 'juegoedvs'
}

def connection():
    return pymysql.connect(**dbConfig)


def update(id, pregunta, a, b, c, d, e, respuesta):
    queryUpdate = f'''UPDATE juegoedvs.preguntas
                SET pregunta = "{pregunta}", a = "{a}", b = "{b}", c = "{c}", d = "{d}", e = "{e}", respuesta = {respuesta} WHERE (id = {id});
                '''
    print(queryUpdate)
    conn = connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(queryUpdate)
            conn.commit()
            # data = cursor.fetchall()
    finally:
        conn.close()
if __name__ == "__main__":
    i = 60
    while(i<=60):
        pregunta = input("pregunta? ")
        a = input("a? ")
        b = input("b? ")
        c = input("c? ")
        d = input("d? ")
        e = input("e? ")
        respuesta = int(input("rta? "))
        update(i, pregunta, a, b, c, d, e, respuesta)
        i+=1