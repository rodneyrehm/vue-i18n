import messages from './fixture/index'

describe('issues', () => {
  let vm, i18n
  beforeEach(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })
    vm = new Vue({ i18n })
  })


  describe('#24', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('continue-with-new-account'),
        messages[vm.$i18n.locale]['continue-with-new-account']
      )
    })
  })

  describe('#35', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('underscore', { helloMsg: 'hello' }),
        'hello world'
      )
    })
  })

  describe('#42, #43', () => {
    it('should not be occured error', () => {
      assert.equal(
        vm.$t('message[\'hello\']'),
        messages[vm.$i18n.locale]['message']['hello']
      )
    })
  })

  describe('#51', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('message.hyphen-locale'),
        'hello hyphen'
      )
    })
  })

  describe('#91, #51', () => {
    it('should be translated', () => {
      const arrayMessages = messages[vm.$i18n.locale].issues.arrayBugs
      for (let i = 0; i < arrayMessages.length; i++) {
        const item = vm.$t('issues.arrayBugs')[i]
        assert.equal(item, arrayMessages[i])
      }
    })
  })

  describe('#97', () => {
    it('should be translated', () => {
      assert.equal(
        vm.$t('message.1234'),
        messages[vm.$i18n.locale]['message']['1234']
      )
      assert.equal(
        vm.$t('message.1mixedKey'),
        messages[vm.$i18n.locale]['message']['1mixedKey']
      )
    })
  })

  describe('#169', () => {
    it('should be translated', done => {
      const Component = Vue.extend({
        __i18n: JSON.stringify({
          en: { custom: 'custom block!' }
        }),
        render (h) {
          return h('p', { ref: 'custom' }, [this.$t('custom')])
        }
      })
      const vm = new Component({ i18n }).$mount()
      nextTick(() => {
        assert.equal(vm.$refs.custom.textContent, 'custom block!')
      }).then(done)
    })
  })

  describe('#170', () => {
    it('should be translated', () => {
      assert.equal(vm.$i18n.t('message.linkHyphen'), messages.en['hyphen-hello'])
      assert.equal(vm.$i18n.t('message.linkUnderscore'), messages.en.underscore_hello)
    })
  })

  describe('#171', () => {
    it('should be translated', done => {
      vm = new Vue({
        i18n,
        render (h) {
          return h('i18n', { props: { path: 'message.linkList' } }, [
            h('strong', [this.$t('underscore_hello')]),
            h('strong', [this.$t('message.link')])
          ])
        }
      }).$mount()
      nextTick(() => {
        assert.equal(
          vm.$el.innerHTML,
          'the world: <strong>underscore the wolrd</strong> <strong>the world</strong>'
        )
      }).then(done)
    })
  })

  describe('#172', () => {
    it('should be translated', done => {
      vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          messages: {
            en: { 'company-name': 'billy-bob\'s fine steaks.' }
          }
        }),
        components: {
          comp: {
            __i18n: JSON.stringify({
              en: { title: '@:company-name - yeee hawwww!!!' }
            }),
            render (h) {
              return h('p', { ref: 'title' }, [this.$t('title')])
            }
          }
        },
        render (h) {
          return h('div', [h('comp', { ref: 'comp' })])
        }
      }).$mount()
      nextTick(() => {
        assert.equal(
          vm.$refs.comp.$refs.title.textContent,
          'billy-bob\'s fine steaks. - yeee hawwww!!!'
        )
      }).then(done)
    })
  })

  describe('#173', () => {
    it('should be translated', done => {
      const Component = Vue.extend({
        __i18n: JSON.stringify({
          en: { custom: 'custom block!' }
        }),
        render (h) {
          return h('p', { ref: 'custom' }, [this.$t('custom')])
        }
      })
      const vm = new Component({
        i18n: new VueI18n({ locale: 'en' })
      }).$mount()
      nextTick(() => {
        assert.equal(vm.$refs.custom.textContent, 'custom block!')
      }).then(done)
    })
  })

  describe('#174', () => {
    it('should be fallback', done => {
      vm = new Vue({
        i18n: new VueI18n({
          locale: 'en',
          fallbackLocale: 'ja',
          messages: {
            en: {},
            ja: { msg: 'メッセージ' }
          }
        }),
        components: {
          comp: {
            i18n: {
              messages: {
                en: {},
                ja: { hello: 'こんにちは' }
              }
            },
            render (h) {
              return h('div', [
                h('p', { ref: 'el1' }, [this.$t('hello')]),
                h('p', { ref: 'el2' }, [this.$t('msg')])
              ])
            }
          }
        },
        render (h) {
          return h('div', [h('comp', { ref: 'comp' })])
        }
      }).$mount()
      const el1 = vm.$refs.comp.$refs.el1
      const el2 = vm.$refs.comp.$refs.el2
      nextTick(() => {
        assert.equal(el1.textContent, 'こんにちは')
        assert.equal(el2.textContent, 'メッセージ')
      }).then(done)
    })
  })
})
