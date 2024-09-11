import '@testing-library/jest-dom/extend-expect';
import {dateBeforeRequesteddays, checkGhostOrderStatus, checkForPrescriptionDisplayCondition, checkPrescriptionNoticeDisplayCondition } from '../../utils/prescriptionReminderUtils';

describe('Tests for Prescription Reminder Util function returning dot', () => {
    test('Test for dateBeforeRequesteddays=30 date function', () => {
        expect(dateBeforeRequesteddays(1669161600000, 30, "dot")).toBeDefined()
        expect(dateBeforeRequesteddays(1669161600000, 30, "dot")).toBe('24.10.2022')
    });
    test('Test for dateBeforeRequesteddays=60 date function', () => {
        expect(dateBeforeRequesteddays(1669161600000, 60, "dot")).toBeDefined()
        expect(dateBeforeRequesteddays(1669161600000, 60, "dot")).toBe('24.09.2022')
    });
})
describe('Tests for Prescription Reminder Util function returning unix', () => {
    test('Test for dateBeforeRequesteddays=30 date function', () => {
        expect(dateBeforeRequesteddays(1669161600000, 30, "unix")).toBeDefined()
        expect(dateBeforeRequesteddays(1669161600000, 30, "unix")).toBe(1666569600000)
    });
    test('Test for dateBeforeRequesteddays=60 date function', () => {
        expect(dateBeforeRequesteddays(1669161600000, 60, "unix")).toBeDefined()
        expect(dateBeforeRequesteddays(1669161600000, 60, "unix")).toBe(1663977600000)
    });
    test('Test for dateBeforeRequesteddays=60 date function', () => {
        expect(dateBeforeRequesteddays(1669161600000, 60, "mix")).not.toBeDefined()
    });
})
describe('Tests for Prescription Reminder Util checkIfAnyRxFreeOrderIsActive', () => {
    test('checkGhostOrderStatus50 ', () => {
        expect(checkGhostOrderStatus({ghostOrder: {status_code: 50, frontend_status: 50}})).toBeDefined()
        expect(checkGhostOrderStatus({ghostOrder: {status_code: 91}, frontend_status: 91})).toBeDefined()
    });
})
describe('Tests for Prescription Reminder Util checkForPrescriptionDisplayCondition', () => {
    test('checkForPrescriptionDisplayCondition ', () => {
        expect(checkForPrescriptionDisplayCondition(1728518400000, 90, 30, true, 1707264000000)).toBeDefined()
        expect(checkForPrescriptionDisplayCondition(1701216000000, 60, 30, false)).toBeDefined()
    });
});
describe('Tests for Prescription Notice Util checkPrescriptionNoticeDisplayCondition', () => {
    test('checkForPrescriptionDisplayCondition ', () => {
        expect(checkPrescriptionNoticeDisplayCondition(1707264000000, 1728518400000)).toBeDefined()
    });
});
