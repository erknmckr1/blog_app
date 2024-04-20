import React from "react";
import axios from "axios";

function News({news1,news2}) {
    console.log(news1)
    return(
        <div>
            
        </div>
    )
}

export default News;

export const getServerSideProps = async (context) => {
    try {
        const page1 = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8ae07b7778c4e50aab671e9a3afc737'
        );
        const page2 = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8ae07b7778c4e50aab671e9a3afc737'
        );

        
        const data1 = page1.data;

        return {
            props: {
                news1: data1 ? data1.articles : [] ,// Varsayılan olarak bu API'nin döndüğü veri yapısına göre ayarlanabilir.

            }
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                news: [] // Hata durumunda boş bir dizi döndürülebilir veya hata işlenebilir.
            }
        };
    }
};