<?php

use yii\db\Migration;

/**
 * Class m191121_231554_add_fk_to_account_table
 */
class m191121_231554_add_fk_to_account_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addForeignKey(
            'fk_account_account_category_id',
            '{{%account}}',
            'account_category_id',
            'account_category',
            'id',
            'CASCADE');

        $this->addForeignKey(
            'fk_account_currency_id',
            '{{%account}}',
            'currency_id',
            'currency',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_account_account_category_id', '{{%account}}');
        $this->dropForeignKey('fk_account_currency_id', '{{%account}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m191121_231554_add_fk_to_account_table cannot be reverted.\n";

        return false;
    }
    */
}
