import { usernameValid, passwordValid, combinationValid } from "../regiValidation.mjs";

test("Username must be from 6 to 20 letters", () => {
    expect(usernameValid("abcdef")).toBe(true);
    expect(usernameValid("abc")).toBe(false);
    expect(usernameValid("username")).toBe(true);
    expect(usernameValid("abcdefghijklmnopqrst")).toBe(true);
    expect(usernameValid("abcdefghijklmnopqrstu")).toBe(false);
});

test("Username must have alphanumeric letters or underscores only, while having at most 2 underscores, not starting with an underscore", () => {
    expect(usernameValid("username_")).toBe(true);
    expect(usernameValid("_username")).toBe(false);
    expect(usernameValid("username👀")).toBe(false);
    expect(usernameValid("username@")).toBe(false);
    expect(usernameValid("username;")).toBe(false);
    expect(usernameValid("username111_")).toBe(true);
    expect(usernameValid("user_name_111")).toBe(true);
    expect(usernameValid("username__")).toBe(true);
    expect(usernameValid("user_name__")).toBe(false);
    expect(usernameValid("_username_")).toBe(false);
});

test("Password must be at least 8 letters, while having a combination of uppercases, lowercases, numbers, and special characters", () => {
    expect(passwordValid("1234")).toBe(false);
    expect(passwordValid("123456789")).toBe(false);
    expect(passwordValid("password")).toBe(false);
    expect(passwordValid("PASSword")).toBe(false);
    expect(passwordValid("PASSword1!")).toBe(true);
    expect(passwordValid("eGr;a1l")).toBe(false);
    expect(passwordValid("1q2W3e4R!")).toBe(true);
});

test("The password cannot contain 4 consecutive letters (case-insensitively) from the username, (i.e. the password must not have any 'chunks' of the username)", () => {
    expect(combinationValid("username", "userPASS1!")).toBe(false);
    expect(combinationValid("username", "USERpass1!")).toBe(false);
    expect(combinationValid("username", "PASSuser1!")).toBe(false);
    expect(combinationValid("username", "usPASSer1!")).toBe(true);
    expect(combinationValid("username", "1!Erna!1")).toBe(false);
    expect(combinationValid("testacct", "testING1!!")).toBe(false);
    expect(combinationValid("testacct", "TEsting1!!")).toBe(false);
    expect(combinationValid("testacct", "Stac1!!!")).toBe(false);
    expect(combinationValid("testacct", "Tect1!!!")).toBe(true);
})

// TODO: Make fourth test