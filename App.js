// MAHMUT ESAT TERZİ - 08.07.2022

import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';

import TableCard from './src/components/TableCard';
import CurrencyCard from './src/components/CurrencyCard';
import AppInput from './src/components/basic/AppInput';

const App = () => {
  // Alacağımız yanıtları dinamik olarak tutmak için useState yazıyoruz.

  const [data, setData] = useState('');
  const [list, setList] = useState('');
  const [search, setSearch] = useState('');

  // UseEffect ile datadaki değişiklikleri sürekli alabiliyoruz. DOM'daki işlem bitince datayı güncelliyor.

  useEffect(() => {
    // Yeni bir XMLHTTPRequest nesnesi oluşturuyoruz.
    // Oluşturduğumuz nesneyi request değişkenine atadık.
    let request = new XMLHttpRequest();

    // onreadystatechange ile sunucuda herhangi bir değişiklik olduğunda şu işlemleri yap diyoruz
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;

        // response hazır değilse durdur.
      }

      if (request.status === 200) {
        // istemci ile sunucu arasındaki iletişim herhangi bir hata olmadan sorunsuz bir şekilde yürütülmüşse devam et.

        let XMLParser = require('react-xml-parser');
        // XML yanıtı parse ediyoruz.

        let xml = new XMLParser().parseFromString(request.responseText);
        // gelen yanıtı metin olarak dönüştürüyoruz.

        setData(xml.getElementsByTagName('Currency'));
        setList(xml.getElementsByTagName('Currency'));

        // Daha önce oluşturduğumuz useState hook'larına gelen yanıttaki "Currency" etiketindeki dataları yazdırıyoruz.
      } else {
        Alert.alert('Uyarı', 'Bağlantı Hatası!');
      }
    };

    request.open('GET', 'https://www.tcmb.gov.tr/kurlar/today.xml', true);
    request.send();
    // console.log(data)
  }, []);

  // FlatList'in renderItem fonksiyonunu dışarda çalıştırmak performans açısından daha iyi olmaktadır.
  // FlatList'in datasındaki verileri oluşturmuş olduğumuz CurrencyCard'ın currency prop'una gönderiyoruz.
  const renderItems = ({item}) => <CurrencyCard currency={item} />;

  const handleSearch = text => {
    if (text) {
      const filteredList = data.filter(currency => {
        const searchedText = text.toLowerCase();
        // Textinput'a girilen yazıyı küçük harflere çeviriyoruz.
        const currentTitle = currency.children[1].value.toLowerCase();
        // Data'daki Döviz cinsini küçük harfe çeviriyoruz.
        // Bu şekilde karşılaştırma yapacağımız her iki alan da aynı şartlara gelmiş oldu.
        return currentTitle.indexOf(searchedText) > -1;
      });
      setData(filteredList);
      setSearch(text);
    } else {
      setData(list);
      setSearch(text);
    }
  };

  // FlatList'in dataları arasına seperator koymak için bir fonksiyon tanımlıyoruz.
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <AppInput
          placeholder="Döviz Kuru Adı Giriniz.. "
          placeholderTextColor={'#ae52d4'}
          onSearch={text => handleSearch(text)}
          value={search}
        />
      </View>
      <View style={styles.title_container}>
        <TableCard title={'Döviz Cinsi'} onPress={data} />
        <TableCard title={'Kod'} />
        <TableCard title={'Alış'} />
        <TableCard title={'Satış'} />
      </View>
      <View style={{flex: 9}}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={item => item.attributes.Kod} // Bütün dataları unique bir key verdik.
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title_container: {
    flex: 1,
    flexDirection: 'row',
  },
  input_container: {
    alignItems: 'center',
  },
  separator: {
    borderWidth: 1,
    borderColor: '#f3e5f5',
  },
});