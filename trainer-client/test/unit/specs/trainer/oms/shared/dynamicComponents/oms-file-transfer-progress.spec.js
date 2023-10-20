/* eslint-disable no-unused-expressions */
import sinon from 'sinon'
import { shallow } from 'avoriaz'
import { expect } from 'chai'
import omsFileTransferProgress from '@/components/trainer/oms/shared/dynamicComponents/oms-file-transfer-progress'

import { polyfill } from 'es6-promise'
polyfill()

describe('trainer/oms/maintMenuSections/components/oms-file-transfer-progress.vue', () => {
  let wrapper
  let emitSpy

  beforeEach(() => {
    let propData = {
      transferInProgress: true,
      transferCompletedRatio: 0,
      transferCompleted: true,
      overAllTransferCompletedRatio: 0,
      files: [[], []]
    }

    wrapper = shallow(omsFileTransferProgress, {
      propData
    })
    emitSpy = sinon.spy(wrapper.vm, '$emit')
  })

  afterEach(() => {
    emitSpy.restore()
  })

  it('should show Write in Progress while transferring', () => {
    let headerMessage = wrapper.find('.progress-wrapper .progress')[0]
    expect(headerMessage.text()).to.equal('Write in Progress')
  })

  it('should show file Name', () => {
    let upperComboMessage = wrapper.find('.progress-wrapper div')[1]
    expect(upperComboMessage.text()).to.equal('File name: XXXXXXX.XXX')
  })

  it('should show Overall Write Progress', () => {
    let lowerComboMessage = wrapper.find('.row')[4].find('span')[0]
    expect(lowerComboMessage.text()).to.equal('Overall Write Progress')
  })

  it('should show cancel', () => {
    let cancelBtn = wrapper.find('.button-container')[0].find('.btn')[0]
    cancelBtn.trigger('click')
    expect(emitSpy.called).to.be.true
  })
})
