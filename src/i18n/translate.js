import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


i18n.translations = {
    en: {
        search: 'Search Pokemon',
        height: 'Height',
        weight: 'Weight',
        hp: 'HP',
        attack: 'ATTACK',
        defense: 'DEFENSE',
        special_attack: 'SPECIAL ATTACK',
        special_defense: 'SPECIAL DEFENSE',
        speed: 'SPEED',
        stats: 'STATS',
        moves: 'MOVES'
    },
    es: {
        search: 'Buscar Pokemon',
        height: 'Altura',
        weight: 'Peso',
        hp: 'HP',
        attack: 'ATAQUE',
        defense: 'DEFENSA',
        special_attack: 'ATAQUE ESPECIAL',
        special_defense: 'DEFENSA ESPECIAL',
        speed: 'VELOCIDAD',
        stats: 'ESTADÍSTICAS',
        moves: 'MOVIMIENTOS'
    },
    ja: {
        search: 'ポケモンを探す',
        height: '高さ',
        weight: '重量',
        hp: 'HP',
        attack: '攻撃',
        defense: '防御',
        special_attack: '必殺技',
        special_defense: '特別な防御',
        speed: '速度',
        stats: '統計',
        moves: '動き'
    }
}

// Set the locale once at the beginning of your app.

i18n.locale = Localization.locale;
console.log(i18n.locale);
i18n.fallbacks = true;

export {
    i18n
}