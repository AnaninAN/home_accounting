<?php

namespace app\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "{{%account}}".
 *
 * @property int $id
 * @property string $name
 * @property float|null $amount
 * @property int $account_category_id
 * @property int $user_id
 * @property int $currency_id
 * @property int $created_at
 * @property int $updated_at
 *
 * @property AccountCategory $accountCategory
 * @property Currency $currency
 * @property User $user
 * @property Transaction[] $transactions
 */
class Account extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%account}}';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'timestampBehavior' => [
                'class' => TimestampBehavior::class,
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                    'value' => time(),
                ],
            ],
        ];
    }

    public function beforeSave($insert)
    {
        if (empty($this->user_id)) $this->user_id = Yii::$app->user->id;
        return parent::beforeSave($insert);
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'account_category_id', 'currency_id'], 'required'],
            [['amount'], 'number'],
            [['account_category_id', 'user_id', 'currency_id', 'created_at', 'updated_at'], 'integer'],
            [['name'], 'string', 'max' => 64],
            [['name'], 'unique'],
            [['account_category_id'], 'exist', 'skipOnError' => true, 'targetClass' => AccountCategory::class, 'targetAttribute' => ['account_category_id' => 'id']],
            [['currency_id'], 'exist', 'skipOnError' => true, 'targetClass' => Currency::class, 'targetAttribute' => ['currency_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'amount' => 'Amount',
            'account_category_id' => 'Account Category ID',
            'user_id' => 'User ID',
            'currency_id' => 'Currency ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function fields()
    {
        return ['id', 'name', 'amount', 'account_category_id', 'currency_id'];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAccountCategory()
    {
        return $this->hasOne(AccountCategory::class, ['id' => 'account_category_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCurrency()
    {
        return $this->hasOne(Currency::class, ['id' => 'currency_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactions()
    {
        return $this->hasMany(Transaction::class, ['account_id' => 'id']);
    }
}
