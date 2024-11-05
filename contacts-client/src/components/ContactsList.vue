<template>
  <div class="contacts">
    <h1>Contacts App</h1>

    <form @submit.prevent="addContact">
      <input
        v-model="newContact.name"
        placeholder="Name"
        required
        pattern="[A-Za-zА-Яа-я]+"
        title="Letters only"
      />
      <input
        v-model="newContact.phone"
        placeholder="Phone"
        required
        type="tel"
        pattern="\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}"
        title="Phone number +X(XXX)XXX-XX-XX"
      />
      <button type="submit">New Contact</button>
    </form>

    <ul>
      <li v-for="contact in contacts" :key="contact._id">
        {{ contact.name }} : {{ contact.phone }}
        <button @click="deleteContact(contact._id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      contacts: [],
      newContact: {
        name: '',
        phone: '',
      },
    }
  },
  methods: {
    async fetchContacts() {
      try {
        const response = await axios.get(
          'http://188.225.58.207:5000/api/contacts'
        )
        this.contacts = response.data
      } catch (error) {
        console.error(error)
      }
    },

    async addContact() {
      try {
        const response = await axios.post(
          'http://188.225.58.207:5000/api/contacts',
          this.newContact
        )
        this.contacts.push(response.data)
        this.newContact.name = ''
        this.newContact.phone = ''
      } catch (error) {
        console.error(error)
      }
    },

    async deleteContact(id) {
      try {
        await axios.delete(`http://188.225.58.207:5000/api/contacts/${id}`)
        this.contacts = this.contacts.filter((contact) => contact._id !== id)
      } catch (error) {
        console.error(error)
      }
    },
  },

  mounted() {
    this.fetchContacts()
  },
}
</script>

<style scoped lang="scss">
$primary-color: #83c5be;
$border-color: #bebebe;
$focus-border-color: $primary-color;
$border-radius: 8px;

.contacts {
  margin: 0 auto;
  width: 80%;
  max-width: 420px;
  min-height: 100vh;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 15px;

  button {
    background-color: $primary-color;
    border: none;
    padding: 15px 25px;
    font-size: 18px;
    font-weight: 500;
    color: #edf6f9;
    border-radius: $border-radius;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      box-shadow: 0 2px 4px #545454bb;
    }

    &:active {
      background-color: darken($primary-color, 8%);
    }
  }
}
h1 {
  text-align: center;
  font-size: 52px;
  background-color: darken($primary-color, 10%);
  color: transparent;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.75);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: $focus-border-color;
    box-shadow: 0 0 8px $primary-color;
  }

  &::placeholder {
    color: darken($border-color, 20%);
    opacity: 1;
  }

  &:hover {
    border-color: darken($border-color, 10%);
  }
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    margin-top: 8px;
    font-size: 18px;
    font-weight: 500;
    color: darken($border-color, 40%);

    &:hover button {
      opacity: 1;
    }

    button {
      transform: translate(8px, -4px);
      position: absolute;
      background-color: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      border-radius: 3px;
      opacity: 0;
      transition: 0.2s ease;

      &:hover {
        background-color: darken(#edf6f9, 5%);
      }
    }
  }
}
</style>
