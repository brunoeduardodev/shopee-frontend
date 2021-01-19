import React, {useCallback, createContext, useState, useEffect} from 'react';
import api from '../services/api'
// import { Container } from './styles';

interface AddItem {
  name: string;
  description: string;
  value: number;
  image: File;
  category_id: number;

}

interface UpdateItem {
  id: number;
  name?: string;
  description?: string;
  value?: number;
  image: File | null  ;
  category_id?: number;

}

interface Item {
  id: number;
  name: string;
  description: string;
  value: number;
  image_url: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
  Items: Item[];
}

interface ItemsContextData {
  categories: Category[];
  allItems: Item[];
  setCategories: (categories: Category[]) => void;
  storeItem: (item: AddItem) => Promise<void>;
  deleteItem: (item: Item) => Promise<void>;
  updateItem: (item: UpdateItem) => Promise<void>;
  fetchItems: () => Promise<void>;

  storeCategory: (name: string) => Promise<void>;
  updateCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const ItemsContext = createContext<ItemsContextData>({} as ItemsContextData)

export const ItemsContextProvider: React.FC = ({children}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([])

  const fetchItems = useCallback(async () => {
    try{
      const categories = await api.get<Category[]>('categories')
      setCategories(categories.data)
    }catch(error){

    }
  }, [])

  useEffect(() => {
    fetchItems();
  }, [fetchItems])

  useEffect(() => {
    let items = [] as Item[]
    for(let i = 0; i < categories.length; i++){
      items = [...items, ...categories[i].Items]
    }
    setAllItems(items)
  }, [categories])


  const storeItem = useCallback(async (item: AddItem) => {
    try{
      const formData = new FormData();
      formData.append('name', item.name)
      formData.append('description', item.description)
      formData.append('value', ""+item.value)
      formData.append('image', item.image)
      formData.append('category_id', ""+item.category_id)
      await api.post('items', formData)
      await fetchItems()
    }catch(error){

    }
  }, [fetchItems])

  const deleteItem = useCallback(async (item: Item) => {
    try{
      await api.delete(`items/${item.id}`)
      await fetchItems();
    }catch(error){

    }
  }, [fetchItems])

  const updateItem = useCallback(async (item: UpdateItem) => {
    try {
      if(item.image){
        const formData = new FormData();
        item.name && formData.append('name', item.name)
        item.description && formData.append('description', item.description)
        item.value && formData.append('value', ""+item.value)
        formData.append('image', item.image)
        item.category_id && formData.append('category_id', ""+item.category_id)
        await api.put(`items/${item.id}`, formData)
      }else{
        await api.put(`items/${item.id}`, item)
      }
      await fetchItems();
    } catch (error) {
      
    }
  }, [fetchItems])

  const storeCategory = useCallback(async (name: string) => {
    try {
      await api.post('categories', {name})
      await fetchItems()
    } catch (error) {
      console.warn('Error storing category ', error)
    }
  }, [fetchItems])

  const updateCategory = useCallback(async (id: number, name: string) => {
    try {
      await api.put(`categories/${id}`, {name})
      await fetchItems();
    } catch (error) {

    }
  }, [fetchItems])

  const deleteCategory = useCallback(async (id: number) => {
    try {
      await api.delete(`categories/${id}`)
      await fetchItems()
    } catch (error) {
      
    }
  }, [fetchItems])

  return (
    <ItemsContext.Provider value={{categories, setCategories, fetchItems, storeItem, deleteItem, updateItem, storeCategory, updateCategory, deleteCategory, allItems }}>
      {children}
    </ItemsContext.Provider>
  )
}


export default ItemsContext;